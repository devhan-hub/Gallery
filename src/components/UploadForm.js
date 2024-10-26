import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Fab, Button  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Progress from './Progress';
import {v4 as uuidv4} from 'uuid'

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

const UploadForm = ({user}) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [fileType , setFileType] = useState(null)
    const[id , setId]= useState(null)

    const types = ['image/png', 'image/jpeg' , 'video/mp4'];

    const handelChange = (e) => {
        e.preventDefault();
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setId(uuidv4());
            toast.success('Successfully uploaded')
            const mimeType =selected.type;
           setFileType(mimeType.split('/')[0]);
        }
        else {
            setFile(null)
            setId(null)
            toast.error('pls seectect an image file (png or jpeg)')
        }
    }
    return (

        <form className='flex flex-col justify-center items-center pt-2 gap-2 w-full'>
            <label  >

            <Fab   sx={{backgroundColor:"#ff6f61", color:'white' , transition:'background-color 0.3s ease','&:active':{backgroundColor:'#d04a3d'} ,'&:hover':{backgroundColor:'#e55a4f'}} }  size='small' component='label' >
  <AddIcon />
  <VisuallyHiddenInput type='file' onChange={handelChange} />

</Fab>
            </label>

            <div className='w-full px-40 flex flex-col gap-2 '>
                {file && <Progress file={file} user={user} fileType={fileType}  setFile={setFile} id={id}/>}
            </div>
        </form>
    )
}

export default UploadForm

