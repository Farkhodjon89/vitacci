import React from 'react';
import { Link } from 'gatsby';

const ImageSliderOneSingle = ({ data, sliderClass }) => {
  return (
    <div className={`single-image ${sliderClass ? sliderClass : ''}`}>
      <Link href={data.link}>
        <img src={data.image} alt="" />
      </Link>
    </div>
  );
};

export default ImageSliderOneSingle;
