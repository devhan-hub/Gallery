import React, { useState, Suspense } from 'react';
import useFirestore from '../hooks/useFirestore';
import Masonry from '@mui/lab/Masonry';
import { motion } from 'framer-motion';
import { MoveToAlbumDialog } from './MoveToAlbumDialog'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Fab, Button, ButtonGroup, Snackbar, Alert, Checkbox } from '@mui/material';
import { FaHeart } from 'react-icons/fa';
import { firebaseStorage, firebaseFirestore } from '../firebase/Config';
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from 'firebase/storage';
import UploadForm from './UploadForm';

const ImageSlide = React.lazy(() => import('./SlideDialog'));

const Video = ({user}) => {
  const [docs] =useFirestore(`users/${user?.uid}/videos`)
  const [ videoSlideoPen,sevideoSlideoPen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [SelectedVideos, setSelectedVideos] = useState([]);
  const [clickTimeOut, setClickTimeOut] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null);

  const toggleSelected = (video) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.some((vid) => vid.id === video.id)
        ? prevSelected.filter((vid) => vid.id !== video.id)
        : [...prevSelected, video]
    );
  };

  const handleClick = (index, video, event) => {
    if (clickTimeOut) {
      clearTimeout(clickTimeOut)
      setClickTimeOut(null)
    }
    if (event.detail === 2) {
      toggleSelected(video);
    }
    else {
      setClickTimeOut(setTimeout(() => {
        setCurrentIndex(index);
        sevideoSlideoPen(true);
      }, 300))
    }
  }

  const handelDeleteOpp = async () => {
    SelectedVideos.forEach(async (video) => {
      const fireRef = doc(firebaseFirestore, 'all-files', video.id)
      const storgaRef = ref(firebaseStorage, video.storagePath)
      try {
        await deleteDoc(fireRef)
        await deleteObject(storgaRef)
        setSelectedVideos([])
      }
      catch (error) {
        setSelectedVideos([])
        console.error("Error deleting image:", error);
      }
    })
  }
  return (
    <>
        <UploadForm user={user}/>

      {docs && (
        <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={3}>
          {docs.map((video, index) => (
            <motion.div
              key={video.id}
              className="relative group pt-4 opacity-70"
              layout
              whileHover={{ opacity: 1 }}
            >
              {SelectedVideos.length > 0 && (
                <Checkbox
                  sx={{ position: 'absolute', left: '0', top: '-20px', zIndex: '30' }}
                  size="small"
                  checked={SelectedVideos.some((vid) => vid.id === video.id)}
                  onChange={() => toggleSelected(video)}
                />
              )}

              <video
                src={video.url}
                autoPlay
                muted
                className="w-full rounded-sm object-fill pt-4"
                onClick={(event) => handleClick(index, video, event)}
              />
              <Fab size='small' sx={{
                //   ...(state.albums && (selectedFavoriteAlbum?.selected.includes(image.url) ? {color:"#ff6f61"}:{borderColor:"#ff6f61" , border:1})),
                fontSize: '1.625rem',
                position: 'absolute',
                top: '20px',
                p: 1,
                right: 0,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '&:hover': { opacity: 1 }
              }}
                // onClick={() =>{ favorite(image.url)}}
                className="group-hover:opacity-100 z-0">
                <FaHeart />
              </Fab>
            </motion.div>
          ))}
        </Masonry>
      )}

      <Suspense fallback={<div>Loading components...</div>}>
        <ImageSlide currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} open={videoSlideoPen} setOpen={sevideoSlideoPen} content={docs} isImage={false} />
      </Suspense>
      {SelectedVideos.length > 0 && (
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
        // onMove={handelAdd}
      />
    </>
  );
};

export default Video;

