import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ShopTopAction from '../../components/product/ShopTopAction';

const ShopTopbar = ({
  getFilterSortParams,
  productCount,
  sortedProductCount,
  filters,
  clearFilters,
}) => {
  return (
    <Fragment>
      {/* shop top action */}
      <ShopTopAction
        filters={filters}
        clearFilters={clearFilters}
        getFilterSortParams={getFilterSortParams}
        productCount={productCount}
        sortedProductCount={sortedProductCount}
      />
    </Fragment>
  );
};

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
  clearFilters: PropTypes.func,
  filters: PropTypes.object,
};

export default ShopTopbar;
