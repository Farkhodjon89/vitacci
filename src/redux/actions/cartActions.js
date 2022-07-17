export const ADD_TO_CART = 'ADD_TO_CART';
export const DECREMENT_QTY = 'DECREMENT_QTY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART';

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize,
  variation
) => {
  const triggerMobileMenu = () => {
    const cartMenu = document.querySelector('.shopping-cart-content');

    cartMenu.classList.add('active');
  };

  return dispatch => {
    triggerMobileMenu();

    if (addToast) {
      addToast('Товар добавлен" В корзину"', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        variation,
        quantity: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
          ? item.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item.selectedProductSize
          ? item.selectedProductSize
          : null,
      },
    });
  };
};
//decrement from cart
export const decrementQty = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast('Количество товара" В корзине" уменьшено', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREMENT_QTY, payload: item });
  };
};
//remove from cart
export const removeFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast('Удалено из корзины', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };
};

export const editProductPriceFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast('Удалено из корзины', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: EDIT_PRODUCT_PRICE_FROM_CART, payload: item });
  };
};
//remove all from cart
export const removeAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast('Корзина очищена', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: REMOVE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter(single => single.color === color)[0]
      .size.filter(single => single.name === size)[0].stock;
  }
};
