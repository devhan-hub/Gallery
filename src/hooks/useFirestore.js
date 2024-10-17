import { useState, useEffect } from 'react';
import { firebaseFirestore } from '../firebase/Config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

const useFirestore = (collectionName  ) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const collRef = collection(firebaseFirestore, collectionName );
      const q = query(collRef, orderBy('createdAt', 'desc'));

      const unsub = onSnapshot(q, (snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
        console.log(documents)
      });
  
      return () => unsub();
    
  
  }, [collectionName  ]);

  return [docs];
}

export default useFirestore;
