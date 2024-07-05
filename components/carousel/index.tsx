import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './styles.css';

const Carousel = () => {
  const imageSrcs = [
    '/gallery/001.jpeg',
    '/gallery/002.jpeg',
    '/gallery/003.jpeg',
    '/gallery/004.jpeg',
    '/gallery/005.jpeg',
    '/gallery/006.jpeg',
    '/gallery/007.jpeg',
    '/gallery/008.jpeg',
    '/gallery/009.jpeg',
    '/gallery/010.jpeg',
  ];

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLElement | null>(null);
  const onAutoplayTimeLeft = (_: any, time: any, progress: any) => {
    progressCircle.current!.style.setProperty('--progress', String(1 - progress));
    progressContent.current!.textContent = `${Math.ceil(time / 1000)}s`;
    console.log(
      'time left:',
      time,
      'progress:',
      progress,
      'progress percentage:',
      100 * progress,
      'progress circle:',
      String(1 - progress)
    );
  };

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className='mySwiper absolute'
    >
      {imageSrcs.map((src, index) => (
        <SwiperSlide className='relative' key={index}>
          <Image
            className='object-cover'
            src={src}
            alt={`Gallery Image ${index + 1}`}
            fill
            priority
            sizes='(min-width: 1024px) 50vw, 100vw'
          />
        </SwiperSlide>
      ))}
      <div
        className='autoplay-progress text-bright-yellow shadow-2xl'
        slot='container-end'
      >
        <svg viewBox='0 0 48 48' ref={progressCircle} className='text-dark-purple stroke-dark-purple'>
          <circle cx='24' cy='24' r='20'></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
};

export default Carousel;
