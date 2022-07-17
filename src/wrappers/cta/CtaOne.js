import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const CtaOne = ({ spaceTopClass, backgroundImage }) => {
  return (
    <div className={`save-money-area ${spaceTopClass ? spaceTopClass : ''}`}>
      <div className="container">
        <div
          className="bg-img pt-100 pb-100"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="save-money-content">
            <h2>Shop and save money</h2>
            <div className="save-money-btn">
              <Link href={'/shop-grid-standard'}>Buy $97.09</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CtaOne.propTypes = {
  backgroundImage: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default CtaOne;
