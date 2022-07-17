import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const BannerThreeSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-lg-6 col-md-6">
      <div
        className={`single-banner-2 ${
          spaceBottomClass ? spaceBottomClass : ''
        }`}
      >
        <Link href={data.link}>
          <img src={data.image} alt="" />
        </Link>
        <div className="banner-content-2">
          <h3>{data.title}</h3>
          <h4>
            {data.subtitle} <span>{data.price}</span>
          </h4>
          <Link href={data.link}>
            <i className="fa fa-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

BannerThreeSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string,
};

export default BannerThreeSingle;
