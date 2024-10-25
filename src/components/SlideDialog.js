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
    <div className={`fixed -top-10 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[999999] p-0 ${open ? '' : 'hidden'}`} >
         
      <div className="bg-white mx-auto w-full relative " >
      <button className="absolute top-10 lg:top-16 lg:right-32 right-16 text-[#007aff] text-2xl cursor-pointer z-[9999999999]" onClick={()=> setOpen(false)}>
          <FaTimes />
        </button>
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
          >
            {content.map((item, index) => (
              <SwiperSlide key={index} className='p-20 h-[80vh]' >
                {isImage ? (
                  <img src={item.url || item} alt="slide content" className="max-h-[75vh] h-auto w-auto mx-auto" />
                ) : (
                  <video src={item.url || item} controls muted alt="slide content" className="max-h-[75vh] h-auto w-auto mx-auto" />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default SlideDialog;