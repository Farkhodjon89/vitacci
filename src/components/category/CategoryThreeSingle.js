import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const CategoryThreeSingle = ({ data, sliderClass }) => {
  return (
    <div className={`collection-product ${sliderClass ? sliderClass : ''}`}>
      <div className="collection-img">
        <Link href={data.link}>
          <img src={data.image} alt="" />
        </Link>
      </div>
      <div className="collection-content text-center">
        <span>{data.subtitle}</span>
        <h4>
          <Link href={data.link}>{data.title}</Link>
        </h4>
        <Link href={data.link} className="collection-btn">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

CategoryThreeSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string,
};

export default CategoryThreeSingle;
