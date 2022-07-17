import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import Swiper from 'react-id-swiper';

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;

      thumbnailSwiper.on('click', () => {
        thumbnailSwiper.slideTo(thumbnailSwiper.clickedIndex);
      });
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: 'fade',
    arrow: true,
  };

  const imagePerSlide = product.image.length < 4 ? product.image.length : 4;

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: imagePerSlide,
    loopedSlides: imagePerSlide,
    loop: true,
    touchRatio: 0.2,
    slideToClickedSlide: false,
    direction: 'vertical',
    breakpoints: {
      1200: {
        slidesPerView: imagePerSlide,
        direction: 'vertical',
      },
      992: {
        slidesPerView: imagePerSlide,
        direction: 'horizontal',
      },
      768: {
        slidesPerView: imagePerSlide,
        direction: 'horizontal',
      },
      640: {
        slidesPerView: imagePerSlide,
        direction: 'horizontal',
      },
      320: {
        slidesPerView: imagePerSlide,
        direction: 'horizontal',
      },
    },
  };

  return (
    <Fragment>
      <div className="row row-5">
        <div
          className={` ${
            thumbPosition && thumbPosition === 'left'
              ? 'col-xl-10 order-1 order-xl-2'
              : 'col-xl-10'
          }`}
        >
          <div className="product-large-image-wrapper">
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="red">-{product.discount}%</span>
                ) : (
                  ''
                )}
                {product.new ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )}
            <LightgalleryProvider key={product.id}>
              <Swiper {...gallerySwiperParams}>
                {product.image &&
                  product.image.map((single, i) => {
                    return (
                      <div key={parseInt(product.id) + i}>
                        <LightgalleryItem group="any" src={single}>
                          <button>
                            <i className="pe-7s-expand1" />
                          </button>
                        </LightgalleryItem>

                        <div className="single-image">
                          <img src={single} className="img-fluid" alt="" />
                        </div>
                      </div>
                    );
                  })}
              </Swiper>
            </LightgalleryProvider>
          </div>
        </div>
        <div
          className={` ${
            thumbPosition && thumbPosition === 'left'
              ? 'col-xl-2 order-2 order-xl-1'
              : 'col-xl-2'
          }`}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            <Swiper key={parseInt(product.id)} {...thumbnailSwiperParams}>
              {product.image &&
                product.image.map((single, i) => {
                  return (
                    <div key={parseInt(product.id) + i}>
                      <div className="single-image">
                        <img src={single} className="img-fluid" alt="" />
                      </div>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.object,
  thumbPosition: PropTypes.string,
};

export default ProductImageGalleryLeftThumb;
