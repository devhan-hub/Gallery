import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaTimes } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SlideDialog = ({ open, setOpen, content, setCurrentIndex, currentIndex, isImage }) => {
  const handleClose = () => {
    setOpen(false);
    setCurrentIndex(null)
  };
   const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  if (!content || currentIndex === null || !content[currentIndex]) {
    return null;
  }

  return (
    <div className={`fixed top-0  left-0 w-full h-screen flex items-center  justify-center  bg-black bg-opacity-90 z-[999999] px-20 ${open ? '' : 'hidden'}`} >
         
      
        {open && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            initialSlide={currentIndex}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            className=' h-auto flex items-center justify-center bg-white bg-opacity-80 relative'
          >
            <button className="absolute top-24 lg:top-16 lg:right-32 right-4 text-[#007aff] text-2xl cursor-pointer z-[9999999999]" onClick={()=> setOpen(false)}>
          <FaTimes />
        </button>
            {content.map((item, index) => (
              <SwiperSlide key={index} className='my-auto mx-auto p-10' >
                {isImage ? (
                  <img src={item.url || item} alt="slide content" className="m-auto max-w-[80%] w-auto max-h-[90vh] h-auto" />
                ) : (
                  <video src={item.url || item} controls muted alt="slide content" className="max-h-[75vh] h-auto w-auto mx-auto" />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    // </div>
  );
};

export default SlideDialog;