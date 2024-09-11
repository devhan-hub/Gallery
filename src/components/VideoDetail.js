import React, { useState } from 'react';
import { FaTimes, FaAngleRight, FaAngleLeft } from "react-icons/fa"


const VideoDetail = ({ videos ,selectedVideo, setSelectedVideo }) => {
  
  const [currentIndex, setCurrentIndex] = useState(
    videos.findIndex(image => image.id === selectedVideo)
  );

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const nextVideo = () => {
    setCurrentIndex((nextIndex) => (nextIndex === videos.length - 1 ? 0 : nextIndex + 1));
  };

  return (
   <>
   
    
    <div className="fixed   bg-black bg-opacity-30 flex items-center justify-center z-50  h-full w-full ">
      <FaAngleLeft className='absolute left-4 text-violet-700 text-3xl cursor-pointer' onClick={prevVideo} />
      <div className='bg-white flex justify-center items-center w-[100vh] mx-auto h-[90vh] py-10'>
        <video
          src={videos[currentIndex].url}
          alt={`image-${videos[currentIndex].id}`}
          className=" h-full mx-auto p-1 border-2 border-white bg-white"
          controls autoPlay 
        />
      </div>
      <FaAngleRight className='absolute right-4 text-violet-700 text-3xl cursor-pointer' onClick={nextVideo} />

      <FaTimes className='cursor-pointer absolute top-4 right-4 text-violet-700 text-xl' onClick={() => setSelectedVideo(null)} />
    </div>
    </>
  );
};

export default VideoDetail;
