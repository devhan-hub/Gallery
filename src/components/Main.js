import React, { useEffect, useReducer, useState } from 'react';
import Navbar from './Navbar';
import AlbumView from './AlbumView';
import Video from './Video';
import { Route, Routes , useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion'
import PictureDisplay from './PictureDisplay';
import Notfound from './Notfound';

const Main = ({user}) => {

    const location = useLocation();
    useEffect(()=> {
  
    })

    return (  
        <div className="min-h-screen bg-gray-100 space-y-0">
          <Navbar />
          <AnimatePresence>
          <Routes location={location} key={location.key}>
       
            <Route path='/' element={<PictureDisplay user={user}/>} />
            <Route path='/albums' element={<AlbumView  user={user}/>} />
             <Route path='/videoss' element={<Video  user={user}/>} />
             <Route path='*' element={<Notfound  />} />  
          </Routes>
          </AnimatePresence>
        </div> 
    );
}

export default Main
