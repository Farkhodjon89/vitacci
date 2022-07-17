import React from 'react';
import { Link } from 'gatsby';

const BannerFifteenSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-xl-4 col-md-6">
      <div
        className={`single-banner ${spaceBottomClass ? spaceBottomClass : ''}`}
      >
        <Link href={data.link}>
          <img src={data.image} alt="" />
        </Link>
        <div className="banner-content banner-content--style2">
          <h3>{data.title}</h3>
          <h4>{data.subtitle}</h4>
          <Link href={data.link}>
            <i className="fa fa-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerFifteenSingle;
