
import React from 'react';
import useFetch from './useFetch';
const Video = ({ setSelectedVideo }) => {
const {datas :videos, isPending, error } = useFetch("http://localhost:8000/videos" ); 

  return (
    <>
     {isPending && <div>Loading...</div>}
     {error && <div>{error}</div>}
      {videos && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 pt-24 px-6 ">
          {videos.map(video => (
            <div key={video.id} className="mb-6 ">
                <video src={video.url} autoPlay muted   className="w-full rounded-sm object-fill"
                onClick={() => setSelectedVideo(video.id)}></video>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Video;

