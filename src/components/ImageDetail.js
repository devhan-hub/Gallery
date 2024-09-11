import React, { useState } from 'react';
import useFetch from './useFetch';
import { FaTimes, FaAngleRight, FaAngleLeft } from "react-icons/fa"


const ImageDetail = ({ images ,selectedImage, setSelectedImage }) => {
  
  const [currentIndex, setCurrentIndex] = useState(
    images.findIndex(image => image.id === selectedImage)
  );

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex((nextIndex) => (nextIndex === images.length - 1 ? 0 : nextIndex + 1));
  };

  return (
   <>
   
    
    <div className="fixed   bg-black bg-opacity-30 flex items-center justify-center z-50  h-full w-full ">
      <FaAngleLeft className='absolute left-4 text-violet-700 text-3xl cursor-pointer' onClick={prevImage} />
      <div className='bg-white flex justify-center items-center w-[100vh] mx-auto h-[90vh] py-10'>
        <img
          src={images[currentIndex].url}
          alt={`image-${images[currentIndex].id}`}
          className=" h-full mx-auto p-1 border-2 border-white bg-white"
        />
      </div>
      <FaAngleRight className='absolute right-4 text-violet-700 text-3xl cursor-pointer' onClick={nextImage} />

      <FaTimes className='cursor-pointer absolute top-4 right-4 text-violet-700 text-xl' onClick={() => setSelectedImage(null)} />
    </div>
    </>
  );
};

export default ImageDetail;
