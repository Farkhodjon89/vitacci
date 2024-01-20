import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const MainSliderMobileSingle = ({ data, sliderClass, backgroundImage }) => {
  return (
    <div
      className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${
        sliderClass ? sliderClass : ''
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className='container h-100'>
        <div className='row h-100'>
          <div className='offset-md-2 offset-lg-1 col-xl-6 col-lg-7 col-md-8 col-12 position-relative'>
            <div className='slider-content-2 slider-content-2--style2 slider-animated-1'>
              <h3 className='animated no-style'>{data.title}</h3>
              <h1 className='animated' style={{ fontSize: '50px' }}>
                {data.subtitle}
              </h1>
              {/*{data.url ? (*/}
              {/*  <div className='slider-btn btn-hover ml-0'>*/}
              {/*    <Link href={data.url}>*/}
              {/*      <a*/}
              {/*        className={`animated ${*/}
              {/*          data.color === 'white' ? 'inverse-button' : ''*/}
              {/*        }`}*/}
              {/*      >*/}
              {/*        {data.buttonTitle}*/}
              {/*      </a>*/}
              {/*    </Link>*/}
              {/*  </div>*/}
              {/*) : null}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MainSliderMobileSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string,
}

export default MainSliderMobileSingle
