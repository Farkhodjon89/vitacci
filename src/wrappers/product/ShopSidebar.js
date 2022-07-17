import PropTypes from 'prop-types';
import React from 'react';

import CatalogCategories from '../../components/product/CatalogCategories';
import ShopPrice from '../../components/product/ShopPrice';
import CatalogColors from '../../components/product/CatalogColors';
import CatalogSizes from '../../components/product/CatalogSizes';
import CatalogHeelHeight from '../../components/product/CatalogHeelHeight';

const ShopSidebar = ({
  categories,
  colors,
  sizes,
  heelHeights,
  filters,
  getFilterParams,
  sideSpaceClass,
}) => {
  let minPrice = 0;
  let maxPrice = 4500000;

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ''}`}>
      {/* shop search */}
      {/*<ShopSearch />*/}

      {/* filter by categories */}
      <CatalogCategories
        key={filters.category}
        categories={categories}
        activeCategory={filters.category}
        getFilterParams={getFilterParams}
      />

      {/* filter by color */}
      <CatalogColors
        colors={colors}
        activeColors={filters.colors || []}
        getFilterParams={getFilterParams}
      />

      {/* filter by size */}
      <CatalogSizes
        sizes={sizes}
        activeSizes={filters.sizes || []}
        getFilterParams={getFilterParams}
      />

      <CatalogHeelHeight
        sizes={heelHeights}
        activeHeelHeight={filters.heelHeights || ''}
        getFilterParams={getFilterParams}
      />

      <ShopPrice
        minPrice={minPrice}
        maxPrice={maxPrice}
        getFilterParams={getFilterParams}
      />

      {/* filter by tag */}
      {/*<ShopTag tags={uniqueTags} getFilterParams={getFilterParams} />*/}
    </div>
  );
};

ShopSidebar.propTypes = {
  getFilterParams: PropTypes.func,
  products: PropTypes.array,
  categories: PropTypes.array,
  sortedProducts: PropTypes.array,
  filters: PropTypes.object,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
