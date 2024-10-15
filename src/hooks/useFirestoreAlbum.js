import { useState ,useEffect} from "react";
import { firebaseFirestore } from '../firebase/Config';
import { onSnapshot ,collection} from 'firebase/firestore';
const useFirestoreAlbum = () => {
    const [docs ,setDocs]= useState(null)
    useEffect(() => {
        const fetchData = async () => {
          const collRef = collection(firebaseFirestore, 'albums');
      
          const unsub = onSnapshot(collRef, (snap) => {
            let documents = [];
      
            snap.forEach((doc) => {
              documents.push({ ...doc.data(), id: doc.id });
            });
      
            setDocs(documents);
          });
      
          return () => unsub();
        };
      
        fetchData();
      
      }, []);
  return ( [docs])
}

export default useFirestoreAlbum
