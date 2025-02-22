import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-id-swiper';
import BrandLogoOneSingle from '../../components/brand-logo/BrandLogoOneSingle';
import brandLogoData from '../../data/brand-logos/brand-logo-one.json';

const BrandLogoSliderTwo = () => {
  const settings = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };

  return (
    <div className={`brand-logo-area`}>
      <div className="container">
        <div className="bg-gray-6 brand-logo-wrap">
          <div className="brand-logo-active-2">
            <Swiper {...settings}>
              {brandLogoData &&
                brandLogoData.map((single, key) => {
                  return (
                    <BrandLogoOneSingle
                      data={single}
                      key={key}
                      sliderClassName="swiper-slide"
                      spaceBottomClass="mb-30"
                    />
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

BrandLogoSliderTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BrandLogoSliderTwo;
