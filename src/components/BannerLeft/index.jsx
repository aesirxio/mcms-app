import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ComponentImage from '../ComponentImage';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import './index.scss';

SwiperCore.use([Navigation, Pagination]);

class BannerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { dataSlider } = this.props;
    return (
      <div className="col-xl-4 p-0 d-none d-xl-block position-relative max-w600">
        <div className="wrapper_banner_left vh-100">
          <div className="content_banner_left d-flex h-100 justify-content-between flex-column">
            <a href="/" className="d-block p-5" style={{ zIndex: 1 }}>
              <ComponentImage alt={'logo'} src={'/assets/images/logo/logo-white.svg'} />
            </a>
            <div className="wrapper_slider position-absolute bottom-0 max-w600">
              <Swiper spaceBetween={20} slidesPerView={1} pagination={{ clickable: true }}>
                {dataSlider.map((value, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div className="wrapper_text_slider">
                        <p className="text_slider fw-semibold max-w600 lh-sm mb-32">{value.text}</p>
                        <p className="title_slider mb-0 fw-bold">{value.title}</p>
                        <p className="subtitle_slider">{value.subtitle}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerLeft;
