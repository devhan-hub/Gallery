import React, { useState, useEffect, Suspense, useContext } from 'react';
import { motion } from 'framer-motion';
import { Fab , Checkbox , Button ,ButtonGroup,Snackbar,Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { MediaContext } from './Reducer';
import { MoveToAlbumDialog } from './MoveToAlbumDialog'
import { handelDelete, handelMove } from './HandelModify'


const ImageSlide = React.lazy(() => import('./SlideDialog'));

const Video = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [SelectedVideos, setSelectedVideos] = useState([]); 
  const[clickTimeOut , setClickTimeOut] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { state, dispatch } = useContext(MediaContext);
  const [isMove, setIsMove] = useState(false)
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const handleClick = ( index , imageId , imageURL , event) => {
    if(clickTimeOut) {
      clearTimeout(clickTimeOut)
      setClickTimeOut(null)
    }
  if(event.detail === 2) {
    toggleSelected(imageId, imageURL);
  }
  else {
  
    setClickTimeOut(setTimeout(()=> {
      setCurrentIndex(index);
      setOpen(true);
    },300))
  }
  }
  
  const toggleSelected = (videoId, videoUrl) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.some((video) => video.videoId === videoId) 
        ? prevSelected.filter((video) => video.videoId !== videoId)
        : [...prevSelected, { videoId, videoUrl }]
    );
  };

  const handelDeleteOpp = () => {
    let selectedVideoId = SelectedVideos.map((selected) => selected.videoId)
    const updatedVideo = state.videos.filter((video) =>
        !selectedVideoId.includes(video.id)
    )
    dispatch({ type: 'deleteMedia', payload: { type: 'video', updatedVideo: updatedVideo } })
    handelDelete(setSnackbarMessage, setSnackbarOpen, isMove, SelectedVideos, setSelectedVideos)
}

const handelMoveOpp = (albumid) => {

  let selectedVideoId = SelectedVideos.map((selected) => selected.videoId)
  const updatedVideo = state.videos.filter((video) =>
      !selectedVideoId.includes(video.id)
  )
  dispatch({ type: 'deleteMedia', payload: { type: 'video', updatedVideo: updatedVideo } })
    let selectedAlbum = state.albums.find((album) => album.id === albumid);
    if (selectedAlbum) {
        const updatedSelected = [...new Set([...selectedAlbum.selected, ...SelectedVideos.map(video => video.videoUrl)])];

        dispatch({ type: 'moveMedia', payload: { albumId: albumid, updatedSelected: updatedSelected } })
        handelMove(albumid, setSelectedVideos, isMove, selectedAlbum, updatedSelected,setSnackbarOpen, setSnackbarMessage ,SelectedVideos,setSelectedVideos)
    }
}
  const ContainerMotion = {
    exit: {
      x: '-100vw',
      transition: { ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      variants={ContainerMotion}
      exit="exit"
    >
      {state.videos && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 pt-28 px-6  md:gap-10  lg:px-10 relative">
          {state.videos.map((video , index) => (
           
              <div key={video.id} className="group mb-8 group md:mb-10 shadow-xl relative">
                  {SelectedVideos.length > 0 && (
                <Checkbox
                  sx={{ position: 'absolute', left: '0', top: '-20px', zIndex: '30' }}
                  size="small"
                  checked={SelectedVideos.some((vid) => vid.videoId === video.id)} 
                  onChange={() => toggleSelected(video.id, video.url)} 
                />
              )}
              <video
                  src={video.url}
                  autoPlay
                  muted
                  className="w-full rounded-sm object-fill pt-4"
                  onClick={(event) => handleClick(index,video.id, video.url , event)}
                />
              </div>
          ))}
        </div>
      )}


<Link to="/upload">
                <Fab
                    sx={{ position: 'fixed', right: '1rem', bottom: '4rem', zIndex: 50, color: '#ff6f61' }}>
                    <AddIcon />
                </Fab>
            </Link>
      <Suspense fallback={<div>Loading components...</div>}>
        <ImageSlide
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          open={open}
          setOpen={setOpen}
          content={state.videos}
          isImage={false}
        />
      </Suspense>
      {SelectedVideos.length > 0 && (
                <ButtonGroup className='flex fixed bottom-0 right-0 mx-auto  gap-4 p-2 justify-center' sx={{ bgcolor: '#ff6f61' }}>
                    <Button sx={{ color: 'white' }}
                        onClick={handelDeleteOpp}
                    > Delete</Button>
                    <Button sx={{ color: 'white' }}
                        onClick={() => { setIsMove(true); setMoveDialogOpen(true) }}> Move To album</Button>
                    <Button sx={{ color: 'white' }}
                        onClick={() => { setIsMove(false); setMoveDialogOpen(true) }}> Copy To Album</Button>
                </ButtonGroup>
            )}
             <MoveToAlbumDialog
                    open={moveDialogOpen}
                    onClose={() => setMoveDialogOpen(false)}
                    onMove={handelMoveOpp}
                />
                  <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
    </motion.div>
  );
};

export default Video;
