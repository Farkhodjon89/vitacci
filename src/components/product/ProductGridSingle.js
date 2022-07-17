import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../helpers/product';
import Rating from './sub-components/ProductRating';
import ProductModal from './ProductModal';
import { formatPrice } from '../../utils/functions';

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const { addToast } = useToasts();

  const finalProductPrice = formatPrice(product.regularPrice);
  const finalDiscountedPrice = formatPrice(product.price);

  const hoverImages = () => {
    return (
      <img
        onMouseEnter={() => {
          const intervalId = setInterval(() => {
            setImageIndex(prevState => {
              if (product.image[prevState + 1]) {
                return prevState + 1;
              } else {
                return 0;
              }
            });
          }, 500);

          setIntervalId(intervalId);
        }}
        onMouseLeave={() => {
          if (intervalId) {
            clearInterval(intervalId);
            setImageIndex(0);
          }
        }}
        className="hover-img img-fluid"
        src={product.image[imageIndex]}
        alt={product.name}
      />
    );
  };

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-6 ${
          sliderClassName ? sliderClassName : ''
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ''}`}
        >
          <div className="product-img">
            <Link href={`/product/${product.slug}`}>
              <a>
                <img className="default-img" src={product.image[0]} alt="" />
                {product.image.length > 1 ? hoverImages() : ''}
              </a>
            </Link>
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

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? 'active' : ''}
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? 'В желаниях'
                      : 'Добавить в список желаний'
                  }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {' '}
                    Купить сейчас{' '}
                  </a>
                ) : product.variations && product.variations.length >= 1 ? (
                  <Link href={`/product/${product.slug}`}>Выбрать размер</Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? 'active'
                        : ''
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={cartItem !== undefined ? ' В корзине' : ' В корзину'}
                  >
                    {' '}
                    <i className="pe-7s-cart"></i>{' '}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? ' В корзине'
                      : ' В корзину'}
                  </button>
                ) : (
                  <button disabled className="active">
                    Нет в наличии
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button
                  onClick={() => setModalShow(true)}
                  title={'Быстрый просмотр'}
                >
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            {product.rating && product.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.rating} />
              </div>
            ) : (
              ''
            )}
            <div className="product-price">
              {product.discount ? (
                <Fragment>
                  <span className="old">
                    {finalProductPrice + currency.currencySymbol}
                  </span>
                  {'|'}
                  <br className="d-sm-none" />
                  <span className="new">
                    {finalDiscountedPrice + currency.currencySymbol}
                  </span>
                </Fragment>
              ) : (
                <span>{finalProductPrice + currency.currencySymbol} </span>
              )}
            </div>
            <div className='zoodpay-price' style={{justifyContent: "center", color: "#dc3545", fontWeight: "bold", fontSize: "15px", fontFamily: "ArsenalRegular", display: "flex", marginTop: "2px"}}>{ formatPrice(Math.round(parseInt(product.discount ? finalDiscountedPrice.replace(/\s/g, '') : finalProductPrice.replace(/\s/g, '')) / 4 )) + currency.currencySymbol} * 4 мес.
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridSingle;
