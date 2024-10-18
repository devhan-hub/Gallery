import { useState, useEffect } from "react";
import { firebaseStorage, firebaseFirestore } from '../firebase/Config';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { Timestamp, collection, addDoc ,getDocs ,query  ,orderBy, limit,doc,setDoc , onSnapshot, where} from "firebase/firestore";
const useStorage = (file  , fileType , userId) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    useEffect(() => {
        const storageRef = ref(firebaseStorage,`all-files/${userId}/${fileType}s/${file.name}`);
        const collectionAllFileRef = collection(firebaseFirestore, `users/${userId}/${fileType}s`)
        const uploadTask = uploadBytesResumable(storageRef, file);
      
        uploadTask.on('state_changed', 
            (snap) => {
                const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            }, 
            (err) => {
                setError(err);
            }, 
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                const fileMetadata = {
                    url:downloadURL,
                    createdAt:Timestamp.now(),
                    type:fileType,
                    storagePath:storageRef.fullPath
                }
                await addDoc(collectionAllFileRef , fileMetadata) 
                 
                const last20FilesQuery = query(collectionAllFileRef, orderBy('createdAt', 'desc'), limit(20));
                onSnapshot(last20FilesQuery, (snap)=>{
                  let last20Url=[];
                  let last20Id=[];
                  snap.forEach(doc=>{
                    last20Url.push( doc.data().url );
                    last20Id.push(doc.id)
                  })
                  const recentlyAddedAlbumRef = doc(firebaseFirestore, `users/${userId}/albums/recently`);
                  setDoc(recentlyAddedAlbumRef, {
                      name: 'recently',
                      files: last20Url,
                    }, { merge: true });
                    const favoriteAddedAlbumRef = doc(firebaseFirestore, `users/${userId}/albums/favorite`);
                    setDoc(favoriteAddedAlbumRef, {
                        name: 'favorite',
                        files: [],
                      }, { merge: true });
                })
                setUrl(downloadURL);

              }
        );
    }, [file]);

    return { progress, url, error };
};

export default useStorage;

const CreateAlbum = (albumName)=>{
  const newAlbumRef = doc(firebaseFirestore , 'albums',albumName)
    setDoc (newAlbumRef , {name:albumName , files:[]})
}
