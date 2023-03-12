import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useToasts } from 'react-toast-notifications'
import { HeadData } from '../components/Head'
import { BreadcrumbsItem, BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'
import { connect } from 'react-redux'
import {
  addToCart,
  decrementQty,
  removeFromCart,
  cartItemStock,
  removeAllFromCart,
  editProductPriceFromCart,
} from '../redux/actions/cartActions'
import LayoutOne from '../components/Layout'
import Breadcrumb from '../wrappers/breadcrumb/Breadcrumb'
import { formatPrice } from '../utils/functions'
import FeatureIcon from '../wrappers/feature-icon/FeatureIcon'
import { StaticDataSingleton } from '../utils/getStaticData'

function arrayUnique(arr) {
  return arr.filter((e, i, a) => a.indexOf(e) == i)
}

const Cart = ({
  cartItems,
  currency,
  decrementQty,
  addToCart,
  removeFromCart,
  removeAllFromCart,
  categories,
}) => {
  const [quantityCount] = useState(1)

  const { addToast } = useToasts()
  let cartTotalPrice = 0

  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData pageUrl='/cart' />

        <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
        <BreadcrumbsItem to={'/cart'}>Корзина</BreadcrumbsItem>

        <LayoutOne categories={categories} headerTop='visible'>
          {/* breadcrumb */}
          <Breadcrumb />
          <div className='cart-main-area pt-90 pb-100'>
            <div className='container'>
              {cartItems && cartItems.length >= 1 ? (
                <Fragment>
                  <h3 className='cart-page-title'>Корзина</h3>
                  <div className='row'>
                    <div className='col-lg-8 mb-3 mb-lg-0'>
                      <div className='table-content table-responsive cart-table-content'>
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Товар</th>
                              <th>Цена</th>
                              <th>Кол-во</th>
                              <th>Итог</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {(cartItems || []).map((cartItem, key) => {
                              const finalProductPrice = cartItem.salePrice
                              const finalDiscountedPrice = cartItem.price

                              cartItem.discount
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity)

                              return (
                                <tr key={key}>
                                  <td className='product-thumbnail'>
                                    <Link
                                      href={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        cartItem.slug
                                      }
                                    >
                                      <a>
                                        <img
                                          className='img-fluid'
                                          src={cartItem.image[0]}
                                          alt=''
                                        />
                                      </a>
                                    </Link>
                                  </td>

                                  <td className='product-name'>
                                    <Link
                                      href={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        cartItem.slug
                                      }
                                    >
                                      <a>{cartItem.name}</a>
                                    </Link>
                                    {cartItem.selectedProductColor &&
                                    cartItem.selectedProductSize ? (
                                      <div className='cart-item-variation'>
                                        <span>
                                          Цвет:{' '}
                                          <span className='value'>
                                            {cartItem.selectedProductColor}
                                          </span>
                                        </span>
                                        <span>
                                          Размер:{' '}
                                          <span className='value'>
                                            {cartItem.selectedProductSize}
                                          </span>
                                        </span>
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </td>

                                  <td
                                    className='product-price-cart'
                                    style={{ position: 'relative' }}
                                  >
                                    {cartItem.discount ? (
                                      <Fragment>
                                        <span className='amount old'>
                                          {formatPrice(finalProductPrice) +
                                            currency.currencySymbol}
                                        </span>
                                        <br />
                                        <span className='amount new'>
                                          {formatPrice(finalDiscountedPrice) +
                                            currency.currencySymbol}
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <span className='amount'>
                                        {formatPrice(finalProductPrice) +
                                          currency.currencySymbol}
                                      </span>
                                    )}
                                    <div
                                      className='zoodpay-price'
                                      style={{
                                        justifyContent: 'center',
                                        color: '#dc3545',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        fontFamily: 'ArsenalRegular',
                                        display: 'flex',
                                        marginTop: '2px',
                                        position: 'absolute',
                                        width: '100%',
                                      }}
                                    >
                                      {formatPrice(
                                        Math.round(
                                          parseInt(
                                            cartItem.discount
                                              ? finalDiscountedPrice
                                              : finalProductPrice
                                          ) / 4
                                        )
                                      ) + currency.currencySymbol}{' '}
                                      / мес.
                                    </div>
                                  </td>

                                  <td className='product-quantity'>
                                    1
                                    {/* <div className="cart-plus-minus">
                                      <button
                                        className="dec qtybutton"
                                        onClick={() =>
                                          decrementQty(cartItem, addToast)
                                        }
                                      >
                                        -
                                      </button>
                                      <input
                                        className="cart-plus-minus-box"
                                        type="text"
                                        value={cartItem.quantity}
                                        readOnly
                                      />
                                      <button
                                        className="inc qtybutton"
                                        onClick={() =>
                                          addToCart(
                                            cartItem,
                                            addToast,
                                            quantityCount
                                          )
                                        }
                                        disabled={
                                          cartItem !== undefined &&
                                          cartItem.quantity &&
                                          cartItem.quantity >=
                                            cartItemStock(
                                              cartItem,
                                              cartItem.selectedProductColor,
                                              cartItem.selectedProductSize
                                            )
                                        }
                                      >
                                        +
                                      </button>
                                    </div> */}
                                  </td>
                                  <td className='product-subtotal'>
                                    {cartItem.discount
                                      ? formatPrice(
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        ) + currency.currencySymbol
                                      : formatPrice(
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        ) + currency.currencySymbol}
                                  </td>

                                  <td className='product-remove'>
                                    <Link href={`/product/${cartItem.slug}`}>
                                      <a>
                                        <i className='fa fa-pencil' />
                                      </a>
                                    </Link>
                                    <button
                                      onClick={() =>
                                        removeFromCart(cartItem, addToast)
                                      }
                                    >
                                      <i className='fa fa-times' />
                                    </button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='col-lg-4 col-md-12'>
                      <div className='grand-totall'>
                        <div className='title-wrap'>
                          <h4 className='cart-bottom-title section-bg-gary-cart'>
                            Всего
                          </h4>
                        </div>
                        {/*<h5>*/}
                        {/*  Total products{' '}*/}
                        {/*  <span>*/}
                        {/*    {currency.currencySymbol +*/}
                        {/*      cartTotalPrice.toFixed(2)}*/}
                        {/*  </span>*/}
                        {/*</h5>*/}

                        <h4 className='grand-totall-title mt-3'>
                          Всего
                          <span>
                            {formatPrice(cartTotalPrice.toFixed(2)) +
                              currency.currencySymbol}
                          </span>
                        </h4>
                        <Link href={'/checkout'}>
                          <a>Перейти к оплате</a>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <p>
                      *Бесплатная доставка при заказе от 1 000 000 сум по Ташкенту осуществляетсяв течении
                      48 часов с момента заказа.
                      <br />
                      *Бесплатная доставка по регионам осуществляется в течение
                      2-3 рабочих дней, в соответствии с графиком работы
                      курьерских служб.
                    </p>
                  </div>

                  <FeatureIcon
                    className='mt-5'
                    spaceBottomClass='pb-1 pt-70'
                    containerClass='container'
                    responsiveClass='res-mrg-md-mt'
                  />

                  <div className='row justify-content-between'>
                    <div className='d-flex'>
                      <div className='cart-shiping-update-wrapper'>
                        <div className='cart-shiping-update'>
                          <Link href={'/catalog'}>
                            <a>Продолжить покупки</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div className='cart-shiping-update-wrapper'>
                        <div className='cart-clear'>
                          <button onClick={() => removeAllFromCart(addToast)}>
                            Очистить корзину
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='item-empty-area text-center'>
                      <div className='item-empty-area__icon mb-30'>
                        <i className='pe-7s-cart' />
                      </div>
                      <div className='item-empty-area__text'>
                        Не найдено товаров в вашей корзине
                        <br />
                        <Link href={'/catalog'}>
                          <a>Продолжить покупки</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </LayoutOne>
      </Fragment>
    </BreadcrumbsProvider>
  )
}

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decrementQty: PropTypes.func,
  location: PropTypes.object,
  removeAllFromCart: PropTypes.func,
  removeFromCart: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount))
    },
    decrementQty: (item, addToast) => {
      dispatch(decrementQty(item, addToast))
    },
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast))
    },
    editProductPriceFromCart: (item, addToast) => {
      dispatch(editProductPriceFromCart(item, addToast))
    },
    removeAllFromCart: (addToast) => {
      dispatch(removeAllFromCart(addToast))
    },
  }
}

export const getStaticProps = async () => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch()

  return {
    props: {
      categories: staticData.categories.main,
    },
    revalidate: 600,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
