import React from 'react';
import { Link } from 'gatsby';

const BannerNineteen = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ''}  ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className="container padding-20-row-col">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20">
              <Link href={'/shop-grid-standard'}>
                <img src={'/assets/images/banner/banner24.jpg'} alt="" />
              </Link>
              <div className="banner-content-4 banner-position-hm15-2 pink-banner">
                <span>-20% Off</span>
                <h2>New Cakes</h2>
                <h5>Best for your Mind.</h5>
                <Link href={'/shop-grid-standard'}>SHOP NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20">
              <Link href={'/shop-grid-standard'}>
                <img src={'/assets/images/banner/banner25.jpg'} alt="" />
              </Link>
              <div className="banner-content-3 banner-position-hm15-2 pink-banner">
                <h3>Honey Cake </h3>
                <p>
                  Starting At <span>$99.00</span>
                </p>
                <Link href={'/shop-grid-standard'}>
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div>
            </div>
            <div className="single-banner mb-20">
              <Link href={'/shop-grid-standard'}>
                <img src={'/assets/images/banner/banner26.jpg'} alt="" />
              </Link>
              <div className="banner-content-3 banner-position-hm17-1 pink-banner">
                <h3>Cup Cake </h3>
                <p>
                  Starting At <span>$99.00</span>
                </p>
                <Link href={'/shop-grid-standard'}>
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerNineteen;
