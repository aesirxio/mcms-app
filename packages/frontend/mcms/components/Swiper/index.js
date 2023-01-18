import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import swiper_1 from '../../public/imgs/swiper_1.png';
import swiper_2 from '../../public/imgs/swiper_2.png';
import swiper_3 from '../../public/imgs/swiper_3.png';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination]);

const SwiperComponent = ({style}) => {
  const dataSlider = [
    {
      title: 'Company1',
      text: '',
      subtitle: '',
      img: swiper_1,
    },
    {
      title: 'Company2',
      text: '',
      subtitle: '',
      img: swiper_2,
    },
    {
      title: 'Company3',
      text: '',
      subtitle: '',
      img: swiper_3,
    },
  ];
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2.4}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className={`col-10 pb-100px ${style?.swiper}`}
    >
      {dataSlider.map((value, key) => {
        return (
          <SwiperSlide key={key}>
            <div className="wrapper_text_slider">
              {/* <p className="text_slider fw-semibold max-w600 lh-sm mb-32">{value.text}</p>
              <p className="title_slider mb-0 fw-bold">{value.title}</p>
              <p className="subtitle_slider">{value.subtitle}</p> */}
              <Image
                quality={100}
                priority={false}
                // layout='fill'
                // objectFit="cover"
                src={value.img}
                alt={'icon'}
                width={value.img.width}
                height={value.img.height}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default SwiperComponent;
