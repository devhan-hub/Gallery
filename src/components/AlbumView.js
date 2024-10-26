import React, { useState, Suspense } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { motion } from 'framer-motion'
import { Button, Checkbox, Snackbar, Alert, Fab, ButtonGroup } from '@mui/material';
import { NewAlbum } from './NewAlbum'
import { MoveToAlbumDialog } from './MoveToAlbumDialog'
import useFirestoreAlbum from '../hooks/useFirestoreAlbum'
import { updateDoc, doc } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase/Config';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const ImageSlide = React.lazy(() => import('./SlideDialog'))
const AlbumView = ({ user }) => {
  const [docs] = useFirestoreAlbum(`users/${user?.uid}/albums`);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedAlbumPhoto, setSelectedAlbumPhoto] = useState([]);
  const [creatOpen, setCreatOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isImage, setIsImage] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [clickTimeOut, setClickTimeOut] = useState(null)
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [isMove, setIsMove] = useState(false)
  const [titel, setTitle] = useState('')

  const handleClickOpen = () => {
    setCreatOpen(true);
  }
  const handleClick = (index, albURL, event, ISimage) => {
    if (clickTimeOut) {
      clearTimeout(clickTimeOut)
      setClickTimeOut(null)

    }
    if (event.detail === 2) {
      toggleSelected(albURL);

    }
    else {

      setClickTimeOut(setTimeout(() => {
        setCurrentIndex(index);
        setOpen(true);
        setIsImage(ISimage)
        console.log(albURL)
      }, 300))
    }
  }

  const toggleSelected = (albURL) => {
    setSelectedAlbumPhoto((prevSelected) =>
      prevSelected.some((Alb) => Alb === albURL)
        ? prevSelected.filter((Alb) => Alb !== albURL)
        : [...prevSelected, albURL]
    );
  };

  const handelDeleteOpp = () => {
    const updated = selectedAlbum.files.filter((alb) =>
      !selectedAlbumPhoto.includes(alb)
    );
    const selectedAlbumRef = doc(firebaseFirestore, `users/${user?.uid}/albums/${selectedAlbum.id}`);
    updateDoc(selectedAlbumRef, {
      files: updated

    })
    setSelectedAlbum({ ...selectedAlbum, files: updated });
    setSelectedAlbumPhoto([])
  }
  const handelAdd = (albumId) => {
    let updatedAlbum = docs.find((album) => album.id === albumId);
    const updated = [...selectedAlbumPhoto, ...updatedAlbum.files];
    const selectedAlbumRef = doc(firebaseFirestore, `users/${user?.uid}/albums/${albumId}`);
    updateDoc(selectedAlbumRef, {
      files: updated
    })
    if (!isMove) {
      setSelectedAlbumPhoto([])
    }
    else {
      handelDeleteOpp()
    }
  }
  const ContainerMotion = {
    exit: {
      x: '-100vw',
      transition: { ease: 'easeInOut' }
    }
  }
  if (!selectedAlbum) {
    return (

      <motion.div
        variants={ContainerMotion}
        exit='exit'
        className="p-4 mt-2 pt-28 space-y-10 relative">

        <Fab
          variant="extended"
          onClick={handleClickOpen}
          sx={{ position: 'absolute', right: '1.05rem', top: '5rem', backgroundColor: '#ff6f61', color: 'white', borderRadius: 3, '&:hover': { bgcolor: '#ff6f61', color: 'white', scale: '.9' } }}
        >
          <LibraryAddIcon sx={{ mr: 1 }} />
          Create
        </Fab>

        <NewAlbum
          open={creatOpen}
          setOpen={setCreatOpen}
          userId={user?.uid}
        />
       <h2 className="font-bold text-lg mb-4 text-violet-700 text-center">Albums</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center ">
    {docs && docs.map(album => {
        let baseFile;
        if (album.files.length > 0) {
            baseFile = album.files[0].split('?')[0];
        }

        return (
            <div
                key={album.id}
                className="relative cursor-pointer flex sm:flex-col items-center mb-6 break-inside-avoid px-20"
                onClick={() => { setSelectedAlbum(album) }}
            >
                {album.files.length === 0 ? (
                    <img
                        src="Images/gallery.png"
                        alt={`Album ${album.id} - No images available`}
                        className="size-28 md:size-36 lg:size-40 rounded-lg object-cover"
                    />
                ) : baseFile && /\.(jpg|jpeg|png|gif)$/i.test(baseFile) ? (
                    <img
                        src={album.files[0]}
                        alt={`Album ${album.id}`}
                        className="size-28 md:size-36 lg:size-40 rounded-lg object-cover"
                    />
                ) : baseFile && /\.(mp4|mov|avi|wmv|mkv)$/i.test(baseFile) ? (
                    <video
                        src={album.files[0]}
                        autoPlay muted
                        className="size-28 md:size-36 lg:size-40 rounded-lg object-cover"
                    />
                ) : (
                    <div className="text-center text-gray-500">
                        Unsupported media type
                    </div>
                )}
                <div className="flex flex-col capitalize text-violet-700 font-semibold p-3 text-md rounded">
                    <p>{album.name}</p>
                    <p>{album.files?.length}</p>
                </div>
            </div>
        );
    })}
</div>

      </motion.div>
    );
  }

  return (
    <motion.div
      variants={ContainerMotion}
      exit='exit'
      className="p-4 pt-28 space-y-6">

      <button
        className="mb-4  text-indigo-600  gap-2 font-semibold capitalize "
        onClick={() => setSelectedAlbum(null)}
      >
        <div className='flex items-center gap-2'>
          <FaAngleLeft className='text-xl' />
          {selectedAlbum.name}
        </div>
        {selectedAlbum.files.length } {'medias'}
      </button>

<div className="md:columns-2 lg:columns-3 gap-6">
    {selectedAlbum && selectedAlbum.files && selectedAlbum.files.length > 0 ? (
        selectedAlbum.files.map((file, index) => {
            const baseFile = file.split('?')[0];

            return (
                <div key={file} className="group mb-8 md:mb-10 shadow-xl relative pt-4">
                    {selectedAlbumPhoto.length > 0 && file && (
                        <Checkbox
                            sx={{ position: 'absolute', left: '0', top: '-20px', zIndex: '30' }}
                            size="small"
                            checked={selectedAlbumPhoto.some((alb) => alb === file)}
                            onChange={() => toggleSelected(file)}
                        />
                    )}
                    {baseFile && /\.(jpg|jpeg|png|gif)$/i.test(baseFile) ? (
                        <img
                            src={file}
                            className="w-full h-auto rounded-lg object-cover mb-6"
                            onClick={(event) => handleClick(index, file, event, true)}
                            alt={`Image ${index}`}
                        />
                      ) : baseFile && /\.(mp4|mov|avi|wmv|mkv)$/i.test(baseFile) ? (  
                          <video
                            src={file}
                            className="w-full h-auto rounded-lg object-cover mb-6"
                            onClick={(event) => handleClick(index, file, event, false)}
                            controls
                            alt={`Video ${index}`}
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="text-center text-gray-500">
                            Unsupported media type
                        </div>
                    )}
                </div>
            );
        })
    ) : (
        <div>No files available in this album.</div>
    )}
</div>

      <Suspense fallback={<div>Loading components...</div>}>
        <ImageSlide
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          open={open}
          setOpen={setOpen}
          content={selectedAlbum.files}
          isImage={isImage}
        />
      </Suspense>
      {selectedAlbumPhoto.length > 0 && (
        <ButtonGroup className='flex fixed bottom-0 right-0 mx-auto  gap-4 p-2 justify-center' sx={{ bgcolor: '#ff6f61' }}>
          <Button sx={{ color: 'white' }}
            onClick={() => { setIsMove(false); handelDeleteOpp() }}
          > Delete</Button>
          <Button sx={{ color: 'white' }}
            onClick={() => {
              setIsMove(true); setMoveDialogOpen(true); setTitle('Move to album')
            }}> Move To album</Button>
          <Button sx={{ color: 'white' }}
            onClick={() => {
              setIsMove(false); setMoveDialogOpen(true); setTitle('Copy to album')
            }}> Copy To Album</Button>
        </ButtonGroup>
      )}

      <Suspense fallback={<div>Loading components...</div>}>
        <MoveToAlbumDialog
          open={moveDialogOpen}
          onClose={() => setMoveDialogOpen(false)}
          onMove={handelAdd}
          userId={user?.uid}
          titel={titel}
        />
      </Suspense>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default AlbumView;
