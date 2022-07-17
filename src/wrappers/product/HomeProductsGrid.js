import PropTypes from 'prop-types';
import React from 'react';
import SectionTitle from '../../components/section-title/SectionTitle';
import ProductGrid from './ProductGrid';

const HomeProductsGrid = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category,
  sectionTitle,
  products,
}) => {
  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      } ${bgColorClass ? bgColorClass : ''}`}
    >
      <div className="container">
        <SectionTitle
          titleText={sectionTitle}
          positionClass="text-left"
          borderClass="no-border"
          spaceClass="mb-20"
        />

        <div className="row">
          <ProductGrid
            category={category}
            type="new"
            limit={4}
            products={products}
            spaceBottomClass="mb-25"
          />
        </div>
      </div>
    </div>
  );
};

HomeProductsGrid.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  products: PropTypes.array,
  sectionTitle: PropTypes.string,
};

export default HomeProductsGrid;
