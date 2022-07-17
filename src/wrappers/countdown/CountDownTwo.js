import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import Countdown from 'react-countdown-now';
import Renderer from '../../components/countdown/Renderer';

const CountDownTwo = ({ spaceTopClass, spaceBottomClass, dateTime }) => {
  return (
    <div
      className={`funfact-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="funfact-content funfact-res text-center">
              <h2>Deal of the day</h2>
              <div className="timer">
                <Countdown date={new Date(dateTime)} renderer={Renderer} />
              </div>
              <div className="funfact-btn funfact-btn-green btn-hover">
                <Link href={'/shop-grid-standard'}>SHOP NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="fruits-deal-img">
              <Link href={'/shop-grid-standard'}>
                <img src={'/assets/images/banner/deal.png'} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CountDownTwo.propTypes = {
  dateTime: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default CountDownTwo;
