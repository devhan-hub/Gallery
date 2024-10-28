import React, { useEffect, useState } from 'react'
import {firebaseAuth}  from '../firebase/Config'
import { onAuthStateChanged } from 'firebase/auth';
const useAuth = () => {
 const [user , setUser]= useState(null)
 const[loading , setLoading]= useState(true)
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(firebaseAuth , (user)=>{
         setUser(user || null)
         setLoading(false)
        })
        return () => unsubscribe();
       }, []);
         return ([ user , loading])
}

export default useAuth
