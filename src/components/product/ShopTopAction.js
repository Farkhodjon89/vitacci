import PropTypes from 'prop-types';
import React from 'react';

const ShopTopAction = ({
  getFilterSortParams,
  productCount,
  sortedProductCount,
  filters,
  clearFilters,
}) => {
  return (
    <div
      className={`mb-35 shop-top-bar justify-content-${
        Object.keys(filters).length ? 'between' : 'end'
      }`}
    >
      {Object.keys(filters).length ? (
        <div className="d-none d-lg-block clear-filter">
          <button onClick={clearFilters}>
            <i className="fa fa-times mr-2" />
            Очистить фильтр
          </button>
        </div>
      ) : (
        ''
      )}

      <div className="select-shoing-wrap align-items-center">
        <div className="shop-select mr-3 d-none d-lg-block">
          <select
            onChange={e => getFilterSortParams('filterSort', e.target.value)}
          >
            <option value="priceHighToLow">Цена - по убыванию</option>
            <option value="priceLowToHigh">Цена - по возрастанию</option>
          </select>
        </div>
        {sortedProductCount > 0 ? (
          <p className="d-none d-lg-block">{`Показано ${sortedProductCount}`}</p>
        ) : null}
      </div>

      {/*<div className="shop-tab">*/}
      {/*  <button*/}
      {/*    onClick={e => {*/}
      {/*      getLayout('grid two-column');*/}
      {/*      setActiveLayout(e);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <i className="fa fa-th-large" />*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    onClick={e => {*/}
      {/*      getLayout('grid three-column');*/}
      {/*      setActiveLayout(e);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <i className="fa fa-th" />*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    onClick={e => {*/}
      {/*      getLayout('list');*/}
      {/*      setActiveLayout(e);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <i className="fa fa-list-ul" />*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  clearFilters: PropTypes.func,
  filters: PropTypes.object,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
};

export default ShopTopAction;
