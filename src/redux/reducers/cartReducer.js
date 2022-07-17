import uuid from 'uuid/v4';
import {
  ADD_TO_CART,
  DECREMENT_QTY,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  EDIT_PRODUCT_PRICE_FROM_CART
} from '../actions/cartActions';

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  switch (action.type) {
    case ADD_TO_CART:
      // for non variant products
      if (product.variation === undefined) {
        const cartItem = cartItems.filter(item => item.id === product.id)[0];
        //if (cartItem === undefined) {
          return [
            ...cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuid(),
            },
          ];
        // } else {
        //   return cartItems.map(item =>
        //     item.cartItemId === cartItem.cartItemId
        //       ? {
        //           ...item,
        //           quantity: product.quantity
        //             ? item.quantity + product.quantity
        //             : item.quantity + 1,
        //         }
        //       : item
        //   );
        // }
        // for variant products
      } else {
        const cartItem = cartItems.filter(
          item =>
            item.id === product.id &&
            product.selectedProductColor &&
            product.selectedProductColor === item.selectedProductColor &&
            product.selectedProductSize &&
            product.selectedProductSize === item.selectedProductSize &&
            (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        )[0];

        //if (cartItem === undefined) {
          return [
            ...cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuid(),
            },
          ];
        // } else if (
        //   cartItem != null &&
        //   (cartItem.selectedProductColor !== product.selectedProductColor ||
        //     cartItem.selectedProductSize !== product.selectedProductSize)
        // ) {
        //   return [
        //     ...cartItems,
        //     {
        //       ...product,
        //       quantity: product.quantity ? product.quantity : 1,
        //       cartItemId: uuid(),
        //     },
        //   ];
        // } else {
        //   return cartItems.map(item =>
        //     item.cartItemId === cartItem.cartItemId
        //       ? {
        //           ...item,
        //           quantity: product.quantity
        //             ? item.quantity + product.quantity
        //             : item.quantity + 1,
        //           selectedProductColor: product.selectedProductColor,
        //           selectedProductSize: product.selectedProductSize,
        //         }
        //       : item
        //   );
        // }
      }

    case DECREMENT_QTY:
      if (product.quantity === 1) {
        const remainingItems = (cartItems, product) =>
          cartItems.filter(
            cartItem => cartItem.cartItemId !== product.cartItemId
          );
        return remainingItems(cartItems, product);
      } else {
        return cartItems.map(item =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

    case REMOVE_FROM_CART:
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          cartItem => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);

    case REMOVE_ALL_FROM_CART:
      return cartItems.filter(item => {
        return false;
      });
    case EDIT_PRODUCT_PRICE_FROM_CART:
        return cartItems.map(item =>
          item.cartItemId === product.cartItemId
            ? { ...item, price: product.price / 2 }
            : item
        );
      
    default:
      return state;
  }
};

export default cartReducer;
