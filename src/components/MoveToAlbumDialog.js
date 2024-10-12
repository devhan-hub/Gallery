import React, { useState  ,useContext} from 'react';
import { FormControl, InputLabel, Select, MenuItem ,TextField} from '@mui/material';
import GenericDialog from './GenericDialog';
import axios from 'axios';
import { v4 } from 'uuid';
import { MediaContext } from './Reducer';

export const MoveToAlbumDialog = ({ open, onClose, onMove }) => {
   const { state, dispatch } = useContext(MediaContext);
    const [selectedAlbumId, setSelectedAlbumId] = useState('');

    return (
        <GenericDialog
            open={open}
            handleClose={onClose}
            title="Move to Album"
            onSubmit={()=> onMove(selectedAlbumId)}>
            <FormControl fullWidth>
                <InputLabel id='album-select'>Select Album</InputLabel>
                <Select
                    labelId='album-select'
                    value={selectedAlbumId}
                    onChange={(e) => setSelectedAlbumId(e.target.value)}
                    fullWidth>
                    {state.albums && state.albums.map((album) => (
                        <MenuItem key={album.id} value={album.id} >
                            {album.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </GenericDialog>
    );
};
 export const FormDialog = ({ open ,setOpen}) => {
  const [title, setTitle] = useState('');
  const {dispatch} = useContext(MediaContext)

  const handleSubmit = (e) => {
    if (title) {
      const newfile = {
        id:v4(),
        title,
        selected: []  
      };
      dispatch({type:'addAlbum', payload:newfile})
      axios.post('http://localhost:8000/Albums',
        newfile, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(() => {
          setOpen(false)
          setTitle('');
        
        })
        .catch(error => {
          console.error('Error adding album:', error);
        }
        )
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







