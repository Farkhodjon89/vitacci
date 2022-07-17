import PropTypes from 'prop-types';
import React from 'react';
import { setActiveSort } from '../../helpers/product';

const ShopCategories = ({ categories, getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget-list">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams('category', '');
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Все категории
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams('category', category);
                        setActiveSort(e);
                      }}
                    >
                      {' '}
                      <span className="checkmark" /> {category}{' '}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          intl.formatMessage({ id: 'categoriesNotFound' })
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
