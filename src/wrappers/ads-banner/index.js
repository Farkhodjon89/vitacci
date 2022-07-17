import React from 'react';
import Link from 'next/link';

const AdsBanner = () => {
  return (
    <div className="container pb-60">
      <div className="row">
        <div className="col-12 col-md-6 pb-4 pb-md-0 square-banner">
          <img
            className="w-100"
            src={`${process.env.PUBLIC_URL}/banners/1_square.jpg`}
            alt=""
          />
          <div className="url-button">
            <Link href="/catalog/sumki">
              <a className="animated def-button">Перейти</a>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 square-banner">
          <img
            className="w-100"
            src={`${process.env.PUBLIC_URL}/banners/2_square.jpg`}
            alt=""
          />
          <div className="url-button">
            <Link href="/catalog/obuv">
              <a className="animated def-button">Перейти</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsBanner;
