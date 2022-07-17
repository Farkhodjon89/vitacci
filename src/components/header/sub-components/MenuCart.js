import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../../helpers/product';
import { formatPrice } from '../../../utils/functions';

const MenuCart = ({ cartData, currency, removeFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const finalProductPrice = single.salePrice;
              const finalDiscountedPrice = single.price;

              single.discount
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link href={'/product/' + single.slug}>
                      <img alt="" src={single.image[0]} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link href={'/product/' + single.slug}>
                        {single.name}
                      </Link>
                    </h4>
                    <h6>
                      {'Количество'}:{' '}
                      <span className="value">{single.quantity}</span>
                    </h6>
                    <span className="price">
                      {single.discount
                        ? formatPrice(
                            finalDiscountedPrice + currency.currencySymbol
                          )
                        : formatPrice(
                          finalProductPrice + currency.currencySymbol
                          )}
                    </span>
                    {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>
                          Цвет:{' '}
                          <span className="value">
                            {single.selectedProductColor}
                          </span>
                        </span>
                        <span>
                          Размер:{' '}
                          <span className="value">
                            {single.selectedProductSize}
                          </span>
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => removeFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              {'Всего'} :{' '}
              <span className="shop-total">
                {formatPrice(cartTotalPrice) + currency.currencySymbol}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link href={'/cart'}>
              <a className="default-btn">{'Посмотреть корзину'}</a>
            </Link>
            {/* <Link href={'/checkout'}>
              <a className="default-btn">{'Оформление заказа'}</a>
            </Link> */}
          </div>
        </Fragment>
      ) : (
        <p className="text-center"> {'Ваша корзина пуста'}</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  removeFromCart: PropTypes.func,
};

export default MenuCart;
