import PropTypes from 'prop-types';
import React from 'react';
import FeatureIconSingle from '../../components/feature-icon/FeatureIconSingle';

const FeatureIcon = ({ spaceTopClass, spaceBottomClass }) => {
  const featureIconData = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/features/free-shipping.png`,
      title: 'Бесплатная доставка',
      to: '/delivery',
      // "subtitle": "Free shipping on all order"
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/features/easy-return.png`,
      title: 'Обмен и возврат',
      to: '/return',
      // "subtitle": "Free shipping on all order"
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/features/quality.png`,
      title: 'Гарантия качества',
      to: '/warranty',

      // subtitle: 'Гарантия качества',
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/features/high-heels.png`,
      title: 'Удобная примерка',
      to: '/delivery',
      // subtitle: 'Гарантия качества',
    },
  ];

  return (
    <div
      className={`support-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className="container">
        <div className="row">
          {featureIconData.map(singleFeature => {
            return (
              <FeatureIconSingle
                singleFeature={singleFeature}
                key={singleFeature.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

FeatureIcon.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default FeatureIcon;
