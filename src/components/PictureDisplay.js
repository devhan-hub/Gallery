import React, { useEffect, useState, Suspense, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Fab, Button, ButtonGroup, Snackbar, Alert, Checkbox } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import {  motion } from 'framer-motion';
import { MoveToAlbumDialog } from './MoveToAlbumDialog'
import { MediaContext } from './Reducer';
import { handelDelete, handelMove, handelPut } from './HandelModify'
const ImageSlide = React.lazy(() => import('./SlideDialog'));
const PictureDisplay = () => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const [imageSlideopen, setImageSlideopen] = useState(false);
    const [moveDialogOpen, setMoveDialogOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [clickTimeOut, setClickTimeOut] = useState(null)
    const { state, dispatch } = useContext(MediaContext);
    const [isMove, setIsMove] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    let selectedFavoriteAlbum = null;
    if(state.albums) {
         selectedFavoriteAlbum = state.albums.find((album) => album.id === '2');
    }


    const toggleSelected = (imageId, imageURL) => {
        setSelectedImages((prevSelected) =>
            prevSelected.some((image) => image.imageId === imageId)
                ? prevSelected.filter((image) => image.imageId !== imageId)
                : [...prevSelected, { imageId, imageURL }]
        );
    };

    const handleClick = (index, imageId, imageURL, event) => {
        if (clickTimeOut) {
            clearTimeout(clickTimeOut)
            setClickTimeOut(null)
        }
        if (event.detail === 2) {
            toggleSelected(imageId, imageURL);
        }
        else {
            setClickTimeOut(setTimeout(() => {
                setCurrentIndex(index);
                setImageSlideopen(true);
            }, 300))
        }
    }
    const handelDeleteOpp = () => {
        let selectedImageId = selectedImages.map((selected) => selected.imageId)
        const updatedImage = state.images.filter((image) =>
            !selectedImageId.includes(image.id)
        )
        dispatch({ type: 'deleteMedia', payload: { type: 'image', updatedImage: updatedImage } })
        handelDelete(setSnackbarMessage, setSnackbarOpen, isMove, selectedImages, setSelectedImages)
    }

    const handelAdd = (albumid) => {
   
        let selectedAlbum = state.albums.find((album) => album.id === albumid);
        if (selectedAlbum) {
            const updatedSelected = [...new Set([...selectedAlbum.selected, ...selectedImages.map(image => image.imageURL)])];
            dispatch({ type: 'addToAlbum', payload: { albumId: albumid, updated: updatedSelected } })
            handelPut(albumid, selectedAlbum, updatedSelected, 'sucessfully Added', setSnackbarOpen, setSnackbarMessage)
            setSelectedImages([])
        }
    }
    const favorite =(imageurl)=> {
        let selectedAlbum = state.albums.find((album) => album.id === '2');
        if (selectedAlbum) {
           if(selectedFavoriteAlbum?.selected.includes(imageurl)) {
            const updated = selectedAlbum.selected.filter((select)=>select !==imageurl)
            handelPut('2',selectedAlbum,updated,'removed from favorite ', setSnackbarOpen ,setSnackbarMessage)
            dispatch({ type: 'addToAlbum', payload: { albumId: '2', updated } } ); 
           } 
           else {
            const updatedSelected = [...selectedAlbum.selected,imageurl ];
            handelPut('2',selectedAlbum,updatedSelected,'added to favorite ',   setSnackbarOpen ,setSnackbarMessage)
            dispatch({ type: 'addToAlbum', payload: { albumId: '2', updated:updatedSelected  } } ); 
           } }
        }
        
     
    return (
        <motion.div className='px-4 pt-20 relative bg-[#f4f4f4]'>
            {state.images && (
                <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={3} >
                    {state.images.map((image, index) => (
                        <div key={image.id} className="relative group pt-4 ">
                            {selectedImages.length > 0 && (
                                <Checkbox
                                    sx={{ position: 'absolute', left: '0', top: '-20px', zIndex: '30' }}
                                    size="small"
                                    checked={selectedImages.some((img) => img.imageId === image.id)}
                                    onChange={() => toggleSelected(image.id, image.url)}
                                />
                            )}
                            <LazyLoadImage
                                effect='blur'
                                src={image.url}
                                alt={`image-${image.id}`}
                                className="rounded-sm mx-auto h-full "
                                onClick={(event) => handleClick(index, image.id, image.url, event)}
                            />

                            <Fab size='small' sx={{
                              ...(state.albums && (selectedFavoriteAlbum?.selected.includes(image.url) ? {color:"#ff6f61"}:{borderColor:"#ff6f61" , border:1})),
                                 fontSize: '1.625rem',
                                position: 'absolute',
                                top: '20px',
                                p:1,
                                right: 0,
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                '&:hover': { opacity: 1 }
                            }}
                                onClick={() =>{ favorite(image.url)}}
                        className="group-hover:opacity-100 z-0">
                                <FaHeart />
                            </Fab>
                        </div>
                    ))}
                </Masonry>
            )}

            <Link to="/upload">
                <Fab
                    sx={{ position: 'fixed', right: '1rem', bottom: '4rem', zIndex: 50, color: '#ff6f61' }}>
                    <AddIcon />
                </Fab>
            </Link>
            <Suspense fallback={<div>Loading components...</div>}>
                <ImageSlide currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} open={imageSlideopen} setOpen={setImageSlideopen} content={state.images} isImage={true} />
            </Suspense>

            {selectedImages.length > 0 && (
                <ButtonGroup className='flex fixed bottom-0 right-0 mx-auto  gap-4 p-2 justify-center' sx={{ bgcolor: '#ff6f61' }}>
                    <Button sx={{ color: 'white' }}
                        onClick={handelDeleteOpp}
                    > Delete</Button>
                    <Button sx={{ color: 'white' }}
                        onClick={() => {  setMoveDialogOpen(true) }}> Add To Album</Button>
                </ButtonGroup>
            )}
            <Suspense fallback={<div>Loading components...</div>}>
                <MoveToAlbumDialog
                    open={moveDialogOpen}
                    onClose={() => setMoveDialogOpen(false)}
                    onMove={handelAdd}
                />
            </Suspense>
            <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </motion.div>
    );
};

export default PictureDisplay
