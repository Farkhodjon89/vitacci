import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

const FeatureIconSingle = ({ singleFeature }) => {
  return (
    <div className="col-lg-3 col-6">
      <Link href={singleFeature.to}>
        <a className="support-wrap justify-content-around mb-30">
          <div className="support-icon">
            <img className="animated" src={singleFeature.image} alt="" />
          </div>
          <div className="support-content d-flex align-items-center">
            <h5>{singleFeature.title}</h5>
            {singleFeature.subtitle ? <p>{singleFeature.subtitle}</p> : ''}
          </div>
        </a>
      </Link>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.object,
};

export default FeatureIconSingle;
