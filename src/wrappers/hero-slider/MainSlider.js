import React, { useEffect, useState } from 'react'
import Swiper from 'react-id-swiper'
import MainSliderSingle from './MainSliderSingle'
import NoSsr from '../../components/NoSsr'
import MainSliderMobileSingle from './MainSliderMobileSingle'

const MainSlider = () => {
  const [windowWidth, setWindowWidth] = useState()
  useEffect(() => {
    const resizeWindow = () => setWindowWidth(window.innerWidth)
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

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
  }

  const sliderData = [
    {
      id: 'first-image',
      image: `${process.env.PUBLIC_URL}/banners/desk4.png`,
      url: '/catalog',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
    {
      id: 'second-image',
      image: `${process.env.PUBLIC_URL}/banners/new.jpg`,
      url: '/catalog',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
    {
      id: 'third-image',
      image: `${process.env.PUBLIC_URL}/banners/slider2/zoodpay.jpg`,
      url: '/installment',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
  ]

  const sliderDataMobile = [
    {
      id: 'first-image',
      mobileImage: `${process.env.PUBLIC_URL}/banners/mob4.png`,
      url: '/catalog?filter_onSale=true',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
    {
      id: 'second-image',
      mobileImage: `${process.env.PUBLIC_URL}/banners/newMob.jpg`,
      url: '/catalog',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
    {
      id: 'third-image',
      mobileImage: `${process.env.PUBLIC_URL}/banners/slider2/zoodpay-mob.jpg`,
      url: '/installment',
      color: 'white',
      title: '',
      subtitle: '',
      buttonTitle: 'Подробнее',
    },
  ]

  return (
    <div className='slider-area'>
      <div className='slider-active nav-style-1'>
        <NoSsr>
          {windowWidth <= 770 ? (
            <Swiper {...params}>
              {sliderDataMobile.map((data, idx) => (
                <MainSliderSingle
                  key={idx}
                  data={data}
                  backgroundImage={data.mobileImage}
                  sliderClass='swiper-slide'
                />
              ))}
            </Swiper>
          ) : (
            <Swiper {...params}>
              {sliderData.map((data, idx) => (
                <MainSliderMobileSingle
                  key={idx}
                  data={data}
                  backgroundImage={data.image}
                  sliderClass='swiper-slide'
                />
              ))}
            </Swiper>
          )}
        </NoSsr>
      </div>
    </div>
  )
}

export default MainSlider
