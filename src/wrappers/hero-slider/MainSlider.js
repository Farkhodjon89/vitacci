import React from 'react';
import Swiper from 'react-id-swiper';
import MainSliderSingle from './MainSliderSingle';
import NoSsr from '../../components/NoSsr';
import useWindowDimensions from '../../components/useWindowDimensions';
import Link from 'next/link';

const MainSlider = () => {
  const params = {
    effect: 'fade',
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <button className='swiper-button-prev ht-swiper-button-nav'>
        <i className='pe-7s-angle-left' />
      </button>
    ),
    renderNextButton: () => (
      <button className='swiper-button-next ht-swiper-button-nav'>
        <i className='pe-7s-angle-right' />
      </button>
    ),
  };

  const sliderData = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/banners/slider2/sale-50.jpg`,
      mobileImage: `${process.env.PUBLIC_URL}/banners/slider2/sale-50-mob.jpg`,
      url: '/catalog',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/banners/slider2/sale.jpg`,
      mobileImage: `${process.env.PUBLIC_URL}/banners/slider2/slider-mob2.jpg`,
      url: '/catalog',
      color: 'white',
      title: '',
      subtitle: '-50% на всю летнюю коллекцию',
      buttonTitle: 'Подробнее',
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/banners/slider2/zoodpay.jpg`,
      mobileImage: `${process.env.PUBLIC_URL}/banners/slider2/zoodpay-mob.jpg`,
      url: '/installment',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
  ];

  return (
    <div className='slider-area'>
      <div className='slider-active nav-style-1'>
        <NoSsr>
          <Swiper {...params}>
            {sliderData &&
              sliderData.map((single, key) => (
                <MainSliderSingle
                  key={key}
                  data={single}
                  sliderClass='swiper-slide'
                />
              ))}
          </Swiper>
        </NoSsr>
      </div>
    </div>
  );
};

export default MainSlider;
