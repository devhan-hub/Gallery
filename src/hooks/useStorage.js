import { useState, useEffect } from "react";
import { firebaseStorage, firebaseFirestore } from '../firebase/Config';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { Timestamp, collection, addDoc } from "firebase/firestore";
const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (!file) return;

        const storageRef = ref(firebaseStorage, file.name);
        const collectionRef = collection(firebaseFirestore, 'images')

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
                const createdAt = Timestamp.now();
                await addDoc(collectionRef, { url: downloadURL, createdAt });  
                 setUrl(downloadURL);
            }
        );
    }, [file]);

    return { progress, url, error };
};

export default useStorage;
