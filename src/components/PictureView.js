
import React from 'react';
import useFetch from './useFetch';
const PictureView = ({ setSelectedImage }) => {
  const {datas :images , isPending, error } = useFetch("http://localhost:8000/images" ); 
 
  return (
    <>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {images && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 pt-24 px-6 ">
          {images.map(image => (
            <div key={image.id} className="mb-6 ">
              <img
                src={image.url}
                alt={`image-${image.id}`}
                className="w-full rounded-sm object-fill"
                onClick={() => setSelectedImage(image.id)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PictureView;

