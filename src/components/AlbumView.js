import React, { useState, Suspense, useContext } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { motion } from 'framer-motion'
import { Button, Checkbox, Snackbar, Alert  , ButtonGroup} from '@mui/material';
import { FormDialog } from './MoveToAlbumDialog'
import { MediaContext } from './Reducer';
import { handelPut } from './HandelModify'
import { MoveToAlbumDialog } from './MoveToAlbumDialog'

const ImageSlide = React.lazy(() => import('./SlideDialog'))
const AlbumView = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedAlbumPhoto, setSelectedAlbumPhoto] = useState([]);
  const [creatOpen, setCreatOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isImage, setIsImage] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { state, dispatch } = useContext(MediaContext);
  const [clickTimeOut, setClickTimeOut] = useState(null)
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [isMove , setIsMove] = useState(false)
  

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
      const updated = selectedAlbum.selected.filter((alb) =>
        !selectedAlbumPhoto.includes(alb)
      );
      dispatch({ type: 'addToAlbum', payload: { albumId: selectedAlbum.id, updated } } ); 
      if(isMove) {
          setSelectedAlbumPhoto([])
      }
      else {
        handelPut(selectedAlbum.id, selectedAlbum, updated, 'sucessfuly deleted', setSnackbarOpen, setSnackbarMessage);
        setSelectedAlbumPhoto([])
      }
  
  }
  const handelAdd = (albumId) => {
    let updatedAlbum = state.albums.find((album) => album.id === albumId);
        const updated = [...updatedAlbum.selected, ...selectedAlbumPhoto];
        dispatch({ type: 'addToAlbum', payload: { albumId, updated } } ); 
        handelPut(albumId, updatedAlbum, updated, 'sucessfully transfered', setSnackbarOpen, setSnackbarMessage)

        if(!isMove)
        {
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

        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ position: 'absolute', right: '1.05rem', top: '5rem' }}
        >
          Create
        </Button>
        <FormDialog
          open={creatOpen}
          setOpen={setCreatOpen}
        />
        <h2 className="font-bold text-lg mb-4 text-violet-700 text-center">Albums</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center ">
          {state.albums && (state.albums.map(album => (

            <div
              key={album.id}
              className="relative cursor-pointer flex sm:flex-col items-center mb-6 break-inside-avoid px-20"
              onClick={() =>{ setSelectedAlbum(album)}}
            >
              {(/\.(mp4)$/i.test(album.selected[0])) ? (
                <video
                  src={album.selected.length !== 0 ? album.selected[album.selected.length - 1] : "Video/all.mp4"}
                  autoPlay muted
                  className="size-28 md:size-36 lg:size-40 rounded-lg object-cover"
                />

              ) : (

                <img
                  src={album.selected.length !== 0 ? album.selected[album.selected.length - 1] : "Images/gallery.png"}
                  alt={`Album ${album.id}`}
                  className="size-28 md:size-36 lg:size-40 rounded-lg object-cover"
                />
              )}
              <div className="flex flex-col capitalize text-violet-700 font-semibold p-3  text-md rounded">
                <p>{album.title}</p>
                <p> {album.selected?.length || 0} </p>
              </div>
            </div>
          )))}

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
          {selectedAlbum.title}
        </div>
        {selectedAlbum.selected.length} {(/\.(mp4)$/i.test(selectedAlbum.selected[0])) ? "Videos" : "Images"}
      </button>

      <div className=" md:columns-2 lg:columns-3 gap-6 ">
        {selectedAlbum.selected.map((selec, index) => (
          <div key={index} className="group mb-8 group md:mb-10 shadow-xl relative pt-4">
            {selectedAlbumPhoto.length > 0 && (
              <Checkbox
                sx={{ position: 'absolute', left: '0', top: '-20px', zIndex: '30' }}
                size="small"
                checked={selectedAlbumPhoto.some((alb) => alb === selec)}
                onChange={() => toggleSelected(selec)}
              />
            )}
            {(/\.(mp4)$/i.test(selec)) ?
              (
                <video
                  src={selec}
                  alt={`photo-${index}`}
                  className="w-full h-auto rounded-lg object-cover mb-6"
                  onClick={(event) => handleClick(index, selec, event, false)}

                />) : (
                <img
                  src={selec}
                  alt={`photo-${index}`}
                  className="w-full h-auto rounded-lg object-cover mb-6"
                  onClick={(event) => handleClick(index, selec, event, true)}
                />
              )}
          </div>
        ))}
      </div>
      <Suspense fallback={<div>Loading components...</div>}>
        <ImageSlide
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          open={open}
          setOpen={setOpen}
          content={selectedAlbum.selected}
          isImage={isImage}
        />
      </Suspense>
      {selectedAlbumPhoto.length > 0 && (
        <ButtonGroup className='flex fixed bottom-0 right-0 mx-auto  gap-4 p-2 justify-center' sx={{ bgcolor: '#ff6f61' }}>
          <Button sx={{ color: 'white' }}
            onClick={()=> {setIsMove(false); handelDeleteOpp()} }
          > Delete</Button>
          <Button sx={{ color: 'white' }}
            onClick={() => { setIsMove(true); setMoveDialogOpen(true) }}> Move To album</Button>
          <Button sx={{ color: 'white' }}
            onClick={() => { setIsMove(false); setMoveDialogOpen(true) }}> Copy To Album</Button>
        </ButtonGroup>
      )}

      <Suspense fallback={<div>Loading components...</div>}>
        <MoveToAlbumDialog
          open={moveDialogOpen}
          onClose={() => setMoveDialogOpen(false)}
          onMove={handelAdd}
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
