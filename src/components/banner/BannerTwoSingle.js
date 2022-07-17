import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const BannerTwoSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-sm-6 col-12">
      <div
        className={`single-banner ${spaceBottomClass ? spaceBottomClass : ''}`}
      >
        <Link href={data.link}>
          <img src={data.image} alt="" />
        </Link>
      </div>
    </div>
  );
};

BannerTwoSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string,
};

export default BannerTwoSingle;
