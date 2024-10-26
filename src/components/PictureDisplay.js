import React, { useState, Suspense , useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import Masonry from '@mui/lab/Masonry';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MoveToAlbumDialog } from './MoveToAlbumDialog'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Fab, Button, ButtonGroup, Checkbox, Typography } from '@mui/material';
import { FaHeart } from 'react-icons/fa';
import { firebaseStorage, firebaseFirestore } from '../firebase/Config';
import { deleteDoc, doc, getDoc, updateDoc ,exists } from "firebase/firestore"
import { deleteObject, ref } from 'firebase/storage';
import useFirestoreAlbum from '../hooks/useFirestoreAlbum'
import UploadForm from './UploadForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

const ImageSlide = React.lazy(() => import('./SlideDialog'));

const PictureDisplay = ({user}) => {
    const [docs] = useFirestore(`users/${user?.uid}/images`); 
    const [albums] = useFirestoreAlbum(`users/${user?.uid}/albums`);  
    const [imageSlideopen, setImageSlideopen] = useState(false);
    const [moveDialogOpen, setMoveDialogOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [clickTimeOut, setClickTimeOut] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentFiles, setCurrentFiles] = useState([]);

    useEffect(() => {
       
        const fetchFavoriteFiles = async () => {
            const favoriteAlbum = doc(firebaseFirestore, `users/${user?.uid}/albums/favorite`);
            const favoriteAlbumDoc = await getDoc(favoriteAlbum);
            if (favoriteAlbumDoc.exists()) {
                setCurrentFiles(favoriteAlbumDoc.data().files || []);
            }
        };

        fetchFavoriteFiles();
    }, [user]);
    const toggleSelected = (image) => {
        setSelectedImages((prevSelected) =>
            prevSelected.some((img) => img.id === image.id)
                ? prevSelected.filter((img) => img.id !== image.id)
                : [...prevSelected, image]
        );
    };

    const handleClick = (index, image, event) => {
        if (clickTimeOut) {
            clearTimeout(clickTimeOut)
            setClickTimeOut(null)
        }
        if (event.detail === 2) {
            toggleSelected(image);
        }
        else {
            setClickTimeOut(setTimeout(() => {
                setCurrentIndex(index);
                setImageSlideopen(true);
            }, 300))
        }
    }

 
    const handelDeleteOpp = async () => {

        try {
             for(const image of selectedImages) {
                 const fireRef = doc(firebaseFirestore,`users/${user?.uid}/images/${image.id}`)
                 const storgaRef = ref(firebaseStorage, image.storagePath) 
                 
                 for(const album of albums ) {
                     const albRef = doc(firebaseFirestore,`users/${user?.uid}/albums/${album.id}`)
                     const filtedFile = album.files.filter((url)=> url !==image.url)
                     await updateDoc(albRef, {
                         files: filtedFile
                       });
                 }
                 await deleteDoc(fireRef);
                 await deleteObject(storgaRef);
             }
             setSelectedImages([]);
             toast.success('successfully deleted')
         } catch (error) {
           setSelectedImages([]);
           toast.error("unabel to delete ");
         }
       };
    const handelAdd = async (albumId) => {
        const selectedImageUrl = selectedImages.map((image) => image.url);
        const selectedAlbumRef = doc(firebaseFirestore,`users/${user?.uid}/albums/${albumId}`);
        const selectedAlbumDoc = await getDoc(selectedAlbumRef);
              if (selectedAlbumDoc.exists()) {
          const currentFiles = selectedAlbumDoc.data().files || [];
                await updateDoc(selectedAlbumRef, {
            files: [...currentFiles, ...selectedImageUrl]
          });
          setSelectedImages([])
          toast.success('successfully added to album')
        } else {
          toast.error("Album does not exist!");
        }
      };


      const handelFav = async (imageUrl) => {
        const favoriteAlbum = doc(firebaseFirestore, `users/${user?.uid}/albums/favorite`);
        const updatedFiles = currentFiles.includes(imageUrl)
            ? currentFiles.filter((file) => file !== imageUrl)
            : [...currentFiles, imageUrl];

        await updateDoc(favoriteAlbum, { files: updatedFiles });
        setCurrentFiles(updatedFiles);

        toast.success(currentFiles.includes(imageUrl) 
            ? 'Successfully removed from favorite album' 
            : 'Successfully added to favorite album'
        );
    };
   
    
    return (
        <>
                  <UploadForm user={user}/>
            {docs && (
                <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={3}>
                    {docs.map((image, index) => (
                        <motion.div
                            key={image.id}
                            className="relative group pt-4 opacity-95 shadow-md p-2"
                            layout
                            whileHover={{ opacity: 1 }}
                        >
                            {selectedImages.length > 0 && (
                                <Checkbox
                                    sx={{ position: 'absolute', left: '0', top: '-20px', zIndex: '30' }}
                                    size="small"
                                    checked={selectedImages.some((img) => img.id === image.id)}
                                    onChange={() => toggleSelected(image)}
                                />
                            )}
                            <LazyLoadImage
                                effect='blur'
                                src={image.url}
                                alt={`image-${image.id}`}
                                className="rounded-sm mx-auto h-full "
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                onClick={(event) => handleClick(index, image, event)}
                            />
                             <Fab
                                size='small'
                                sx={{
                                    ...(currentFiles.includes(image.url)
                                        ? { color: "#ff6f61" }
                                        : { borderColor: "#ff6f61", border: 1 }
                                    ),
                                    fontSize: '1.625rem',
                                    position: 'absolute',
                                    top: '20px',
                                    p: 1,
                                    right: 0,
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    '&:hover': { opacity: 1 }
                                }}
                                onClick={() => handelFav(image.url)}
                                className="group-hover:opacity-100 z-0"
                            >
                                <FaHeart />
                            </Fab>
                        </motion.div>
                    ))}
                </Masonry>
            )}

            <Suspense fallback={<div>Loading components...</div>}>
                <ImageSlide currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} open={imageSlideopen} setOpen={setImageSlideopen} content={docs} isImage={true} />
            </Suspense>

            {selectedImages.length > 0 && (
                <ButtonGroup className='flex fixed bottom-0 right-0 mx-auto  gap-4 p-2 justify-center' sx={{ bgcolor: '#ff6f61' }}>
                    <Button sx={{ color: 'white' }}
                        onClick={handelDeleteOpp}
                    > Delete</Button>
                    <Button sx={{ color: 'white' }}
                        onClick={() => { setMoveDialogOpen(true) }}> Add To Album</Button>
                </ButtonGroup>
            )}

                <MoveToAlbumDialog
                    open={moveDialogOpen}
                    onClose={() => setMoveDialogOpen(false)}
                    onMove={handelAdd}
                    userId={user?.uid}
                    titel={"Add to album"}

                />
        </>
    );
};

export default PictureDisplay;
