import PropTypes from 'prop-types';
import React from 'react';

const heelSizeTranslations = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  skyHigh: 'Очень высокий',
};

const ShopHeelHeight = ({ heights, activeHeelHeight, getFilterParams }) => {
  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget-list">
        {heights ? (
          <ul>
            {Object.keys(heights).map((key, i) => {
              return (
                <li key={i}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={`text-uppercase ${
                        activeHeelHeight === key ? 'active' : ''
                      }`}
                      onClick={e => {
                        getFilterParams('heelHeight', key);
                        // setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" />
                      {heelSizeTranslations[key]}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          'Размеры не найдены'
        )}
      </div>
    </div>
  );
};

ShopHeelHeight.propTypes = {
  getFilterParams: PropTypes.func,
  activeHeelHeight: PropTypes.string,
  heights: PropTypes.object,
};

export default ShopHeelHeight;
