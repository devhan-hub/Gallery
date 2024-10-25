import React, { useEffect, useState } from 'react'
import {firebaseAuth}  from '../firebase/Config'
import { onAuthStateChanged } from 'firebase/auth';
const useAuth = () => {
 const [user , setUser]= useState(null)
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged((firebaseAuth) , (user)=>{
           if(user){
             setUser(user)
     }
           else{
             setUser(null)
           }
          
        })
        return () => unsubscribe();
       }, [user]);
         return ( [user])
}

export default useAuth
