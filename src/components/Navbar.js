import React from 'react';
import {FaAlbum , FaImage , FaVideo} from 'react-icons/fa'
import {MdAlbum} from 'react-icons/md'

const Navbar = ({ setView }) => {
  return (
    <nav className="flex justify-around p-4 bg-white shadow-md fixed w-full top-0 " >
      <button 
        onClick={() => setView('pictures')} 
        className="  text-violet-700 font-bold items-center gap-4 flex flex-col sm:flex-row"
      >
        <FaImage className='hidden sm:block text-lg'/>
        Image
      </button>
      <button 
        onClick={() => setView('video')} 
        className="text-violet-700 font-bold items-center gap-4 flex flex-col  sm:flex-row"

      >
        <FaVideo className='hidden sm:block text-lg' />
        Video
      </button>

      <button 
        onClick={() => setView('albums')} 
        className="text-violet-700  font-bold items-center gap-4 flex flex-col sm:flex-row"

      >
        <MdAlbum className='hidden sm:block text-lg'/>
        Albums
      </button>
    </nav>
  );
};

export default Navbar;
