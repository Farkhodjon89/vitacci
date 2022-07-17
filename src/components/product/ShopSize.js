import PropTypes from 'prop-types';
import React from 'react';

const ShopSize = ({ sizes, activeSizes, getFilterParams }) => {
  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget-list">
        {sizes ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={!activeSizes.length ? 'active' : ''}
                  onClick={e => {
                    getFilterParams('sizes', '');
                    // setActiveSort(e);
                  }}
                >
                  <span className="checkmark" />
                  Все размеры
                </button>
              </div>
            </li>
            {sizes.map((size, key) => {
              size = String(size);

              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={`text-uppercase ${
                        activeSizes.includes(size) ? 'active' : ''
                      }`}
                      onClick={e => {
                        getFilterParams('sizes', size);
                        // setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" />
                      {size}
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

ShopSize.propTypes = {
  getFilterParams: PropTypes.func,
  activeSizes: PropTypes.array,
  sizes: PropTypes.array,
};

export default ShopSize;
