import React, { useEffect, useReducer, useState } from 'react';
import Navbar from './Navbar';
import AlbumView from './AlbumView';
import Video from './Video';
import UploadPhoto from './UploadPhoto';
import { Route, Routes , useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion'
import PictureDisplay from './PictureDisplay';
import Notfound from './Notfound';

const App = () => {

  const location = useLocation();
  useEffect(()=> {

  })
  return (  
      <div className="min-h-screen bg-gray-100 space-y-0">
        <Navbar />
        <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path='/' element={<PictureDisplay/>} />
          <Route path='/albums' element={<AlbumView />} />
          <Route path='/upload' element={<UploadPhoto  />} />
          <Route path='/videoss' element={<Video />} />
          <Route path='*' element={<Notfound  />} />
        </Routes>
        </AnimatePresence>
      </div> 
  );
};

export default App;

