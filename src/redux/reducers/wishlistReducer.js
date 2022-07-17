import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  REMOVE_ALL_FROM_WISHLIST,
} from '../actions/wishlistActions';

const initState = [];

const wishlistReducer = (state = initState, action) => {
  const wishlistItems = state,
    product = action.payload;

  switch (action.type) {
    case ADD_TO_WISHLIST:
      const wishlistItem = wishlistItems.filter(
        item => item.id === product.id
      )[0];
      if (wishlistItem === undefined) {
        return [...wishlistItems, product];
      } else {
        return wishlistItems;
      }

    case REMOVE_FROM_WISHLIST:
      const remainingItems = (wishlistItems, product) =>
        wishlistItems.filter(wishlistItem => wishlistItem.id !== product.id);
      return remainingItems(wishlistItems, product);

    case REMOVE_ALL_FROM_WISHLIST:
      return wishlistItems.filter(item => {
        return false;
      });

    default:
      return wishlistItems;
  }
};

export default wishlistReducer;
