import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-id-swiper';
import SectionTitle from '../../components/section-title/SectionTitle';
import ProductGrid from './ProductGrid';

const RelatedProductSlider = ({ spaceBottomClass, category, products }) => {
  const settings = {
    loop: false,
    slidesPerView: products.length > 4 ? 4 : products,
    grabCursor: true,
    breakpoints: {
      1200: {
        slidesPerView: products.length > 4 ? 4 : products.length,
      },
      992: {
        slidesPerView: products.length > 3 ? 3 : products.length,
      },
      320: {
        slidesPerView: products.length > 2 ? 2 : products.length,
      },
    },
  };

  return (
    <div
      className={`related-product-area ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      {products.length ? (
        <div className="container">
          <SectionTitle
            titleText="Похожие товары"
            positionClass="text-center"
            spaceClass="mb-50"
          />
          <div className="row">
            <Swiper {...settings}>
              <ProductGrid
                products={products}
                limit={4}
                type="new"
                sliderClassName="swiper-slide"
              />
            </Swiper>
          </div>
        </div>
      ) : null}
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default RelatedProductSlider;
