import { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Fab, Button } from '@mui/material';
import Progress from './Progress';
import AddIcon from '@mui/icons-material/Add';

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

const UploadForm = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [fileType , setFileType] = useState(null)
    const types = ['image/png', 'image/jpeg' , 'video/mp4'];


    const handelChange = (e) => {
        e.preventDefault();
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError('')
            const mimeType =selected.type;
           setFileType(mimeType.split('/')[0]);
        }
        else {
            setFile(null)
            setError('pls seectect an image file (png or jpeg)')
        }
    }
    return (

        <form className='flex flex-col justify-center items-center pt-20 gap-2'>
            <label  >

                <Button component="label" variant="contained"  >
                    UPLOAD FILES
                    <VisuallyHiddenInput type='file' onChange={handelChange} />
                </Button>
            </label>

            <div>
                {error && <div>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <Progress file={file} setFile={setFile} fileType={fileType} />}
            </div>
        </form>
    )
}

export default UploadForm

