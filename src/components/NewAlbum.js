import GenericDialog from './GenericDialog';
import { useState } from 'react';
import {TextField} from '@mui/material';
import {  firebaseFirestore } from '../firebase/Config';
import { setDoc ,doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const NewAlbum = ({ open ,setOpen , userId}) => {
    const [title, setTitle] = useState('');
    const handleSubmit = (e) => {
      if (title) {
        const fav = doc(firebaseFirestore, `users/${userId}/albums/${title}`); 
        setDoc(fav, {
          name:title,
          files:[]
        })
        toast.success(`successfully created album ${title}`)
      }
     
  setOpen(false)  };
  
    return (
      <GenericDialog
        open={open}
        handleClose={()=> setOpen(false)}
        title="Add New Album"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
      </GenericDialog>
    );
  };