import axios from "axios"

export const handelDelete = (setSnackbarMessage, setSnackbarOpen, isMove, selectedItem, setselectedItem ,albumid,selectedAlbum,updatedSelected) => {
    selectedItem.forEach((selected) => {
        axios.delete(
            `http://localhost:8000/${
              selected.videoId ? `videos/${selected.videoId}` : selected.imageId ? `images/${selected.imageId}` : ''
            }`    
          ) .then(() => {
                setSnackbarOpen(true)
                if (isMove) {
                    handelPut(albumid, selectedAlbum, updatedSelected, 'sucessfully moved', setSnackbarOpen, setSnackbarMessage ,isMove)
                }
                else {
                    setSnackbarMessage('seccessfully deleted ')  
                }
            })
            .catch(() => {
                setSnackbarOpen(true)
                setSnackbarMessage('error happen')
            })
    })
    setselectedItem([])
}


export const handelMove = (albumid, setselectedItem, isMove, selectedAlbum, updatedSelected ,setSnackbarOpen ,setSnackbarMessage ,selectedImages ,setSelectedImages) => {
    if (isMove) {
            handelDelete(setSnackbarMessage,setSnackbarOpen,isMove,selectedImages,setSelectedImages ,albumid,  selectedAlbum,updatedSelected,updatedSelected)
        }
     else {
        handelPut(albumid, selectedAlbum, updatedSelected, 'sucessfully copied', setSnackbarOpen, setSnackbarMessage ,isMove)
        setselectedItem([])
     }    
}

export const handelPut = (albumid, selectedAlbum, updatedSelected, message, setSnackbarOpen, setSnackbarMessage ) => {
    axios.put(`http://localhost:8000/Albums/${albumid}`, { ...selectedAlbum, selected: updatedSelected }, { 'Content-Type': 'application/json' })
        .then(() => {
                setSnackbarOpen(true)
                setSnackbarMessage(message)
                
        })
        .catch(() => {
            setSnackbarOpen(true)
            setSnackbarMessage('error happen')
        })
}