import React from 'react';
import Swiper from 'react-id-swiper';
import sliderData from '../../data/hero-sliders/hero-slider-twenty-three.json';
import HeroSliderTwentyThreeSingle from '../../components/hero-slider/HeroSliderTwentyThreeSingle.js';

const HeroSliderTwentyThree = () => {
  const params = {
    effect: 'fade',
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          {sliderData &&
            sliderData.map((single, key) => {
              return (
                <HeroSliderTwentyThreeSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderTwentyThree;
