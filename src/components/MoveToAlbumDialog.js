import React, { useState  ,useContext} from 'react';
import { FormControl, InputLabel, Select, MenuItem ,TextField} from '@mui/material';
import GenericDialog from './GenericDialog';
import useFirestoreAlbum from '../hooks/useFirestoreAlbum'


export const MoveToAlbumDialog = ({ open, onClose, onMove , userId, titel }) => {
    const [docs] = useFirestoreAlbum(`users/${userId}/albums`);
    const [selectedAlbumId, setSelectedAlbumId] = useState('');

    return (
        <GenericDialog
            open={open}
            handleClose={onClose}
            title={titel}
            onSubmit={()=> onMove(selectedAlbumId)}>
            <FormControl fullWidth>
                <InputLabel id='album-select'>Select Album</InputLabel>
                <Select
                    labelId='album-select'
                    value={selectedAlbumId}
                    onChange={(e) => setSelectedAlbumId(e.target.value)}
                    fullWidth>
                    {docs && docs.map((album) => (
                        <MenuItem key={album.id} value={album.id} >
                            {album.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </GenericDialog>
    );
};
 







