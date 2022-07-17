import PropTypes from 'prop-types';
import React from 'react';
import { setActiveSort } from '../../helpers/product';
import { capitalize } from '../../utils/functions';

const ShopColor = ({ colors, activeColors, getFilterParams }) => {
  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget-list">
        {colors ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={!activeColors.length ? 'active' : ''}
                  onClick={e => {
                    getFilterParams('colors', '');
                    // setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Все цвета
                </button>
              </div>
            </li>
            {colors.map((color, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={activeColors.includes(color) ? 'active' : ''}
                      onClick={e => {
                        getFilterParams('colors', color);
                        // setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {capitalize(color)}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          'Цвета не найдены'
        )}
      </div>
    </div>
  );
};

ShopColor.propTypes = {
  colors: PropTypes.array,
  activeColors: PropTypes.array,
  getFilterParams: PropTypes.func,
};

export default ShopColor;
