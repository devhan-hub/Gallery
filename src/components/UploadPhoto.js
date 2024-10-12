import React, { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CloudUpload from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { MediaContext } from './Reducer';
import { v4 } from 'uuid';

const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
});

const UploadPhoto = () => {
   const [file, setFile] = useState(null);
   const [fileName, setFileName] = useState('no selected file');
   const [error, setError] = useState(null);
   const typesImages = ['image/png', 'image/jpg', 'image/jpeg'];
   const typesVideos = ['video/mp4'];
   const [isImage, setIsImage] = useState(true);
   const navigate = useNavigate();
   const { dispatch } = useContext(MediaContext);
   const [snackbarOpen, setSnackbarOpen] = useState(false);
   const [snackbarMessage, setSnackbarMessage] = useState('');

   const changeHandler = (e) => {
      let selected = e.target.files[0];
      if (typesVideos.includes(selected.type)) {
         setIsImage(false);
      } else if (typesImages.includes(selected.type)) {
         setIsImage(true);
      } else {
         setFile(null);
         setError('please select an image or video file (png, jpeg, jpg, mp4)');
         setFileName("");
         return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
         setFile(reader.result);
         setError('');
         setFileName(selected.name);
      };
      reader.readAsDataURL(selected);
   };

   const uploadHandler = () => {
      if (file) {
         let newFile = {
            url: file,
            id: v4(),
         };
         dispatch({ type: 'addMedia', payload: { type: isImage ? 'image' : 'video', newFile } });

         fetch(`http://localhost:8000/${isImage ? 'images' : 'videos'}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFile),
         })
         .then(() => {
            setSnackbarOpen(true);
            setSnackbarMessage('successfully uploaded');
            setTimeout(() => {
               setFile(null);
               setFileName("no selected file");
               setError(null);
               isImage ? navigate('/') : navigate('/videoss');
            }, 1000);
         })
         .catch((err) => {
            setError('oops error exists');
            navigate(isImage ? '/' : '/videoss');
         });
      }
   };

   return (
      <div className='relative flex flex-col gap-6 items-center justify-center h-screen pt-20'>
         <form className='flex items-center justify-center w-[100vh] mx-auto h-[60vh] border-2 border-dotted p-16 cursor-pointer border-[#1976d2] rounded-md' onClick={() => document.querySelector('.input-filed').click()}>
            <input type="file" accept='image/*,video/mp4' onChange={changeHandler} className='input-filed hidden' />
            {file ? (
               isImage ? (
                  <img src={file} className='mx-auto h-auto max-h-80 w-80 p-2 object-contain rounded-md bg-white shadow-lg' />
               ) : (
                  <video src={file} className='mx-auto h-auto max-h-80 w-80 p-2 object-contain rounded-md bg-white shadow-lg' controls />
               )
            ) : (
               <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                  UPLOAD FILES
                  <VisuallyHiddenInput type='file' onChange={changeHandler} />
               </Button>
            )}
         </form>
         <Box className='shadow-lg flex justify-between w-[100vh] p-4 rounded-md cursor-pointer italic capitalize text-[#1976d2]'>
            <Button variant='contained' onClick={uploadHandler}>Upload</Button>
            <div className='flex gap-6 items-center'>
               {fileName ? fileName : error && <Typography variant='h6'>{error}</Typography>}
               <IconButton onClick={() => { setFile(null); setFileName("no selected file"); setError(null); }}>
                  <DeleteIcon color='primary' />
               </IconButton>
            </div>
         </Box>
         <FaTimes className='absolute top-20 right-4 text-2xl text-[#1976d2] cursor-pointer' onClick={() => { isImage ? navigate('/') : navigate('/videoss'); }} />
         <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)}>
               {snackbarMessage}
            </Alert>
         </Snackbar>
      </div>
   );
}

export default UploadPhoto;
