import PropTypes from 'prop-types';
import ProductGridListSingle from './ProductGridListSingle';
import React from 'react';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist } from '../../redux/actions/wishlistActions';
import { connect } from 'react-redux';

const CatalogProducts = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  cartItems,
  wishlistItems,
}) => {
  return products.map(product => (
    <ProductGridListSingle
      sliderClassName={null}
      spaceBottomClass="mb-25"
      product={product}
      currency={currency}
      addToCart={addToCart}
      addToWishlist={addToWishlist}
      cartItem={cartItems.filter(cartItem => cartItem.id === product.id)[0]}
      wishlistItem={
        wishlistItems.filter(wishlistItem => wishlistItem.id === product.id)[0]
      }
      key={product.id}
    />
  ));
};

CatalogProducts.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogProducts);
