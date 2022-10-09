import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { useToasts } from 'react-toast-notifications'
import { HeadData } from '../components/Head'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { connect } from 'react-redux'
import {
  addToWishlist,
  removeFromWishlist,
  removeAllFromWishlist,
} from '../redux/actions/wishlistActions'
import { addToCart } from '../redux/actions/cartActions'
import LayoutOne from '../components/Layout'
import Breadcrumb from '../wrappers/breadcrumb/Breadcrumb'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'
import { formatPrice } from '../utils/functions'
import { StaticDataSingleton } from '../utils/getStaticData'

const Wishlist = ({
  categories,
  cartItems,
  currency,
  addToCart,
  wishlistItems,
  removeFromWishlist,
  removeAllFromWishlist,
}) => {
  const { addToast } = useToasts()

  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData pageUrl='/wishlist' />

        <BreadcrumbsItem to={'/'}>Home</BreadcrumbsItem>
        <BreadcrumbsItem to={'/wishlist'}>Список желаний</BreadcrumbsItem>

        <LayoutOne categories={categories} headerTop='visible'>
          {/* breadcrumb */}
          <Breadcrumb />
          <div className='cart-main-area pt-90 pb-100'>
            <div className='container'>
              {wishlistItems && wishlistItems.length >= 1 ? (
                <Fragment>
                  <h3 className='cart-page-title'>Ваш список желаний</h3>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='table-content table-responsive cart-table-content'>
                        <table>
                          <thead>
                            <tr>
                              <th />
                              <th>ТОВАР</th>
                              <th>Цена</th>
                              <th>Добавить в корзину</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {wishlistItems.map((wishlistItem, key) => {
                              const finalProductPrice = formatPrice(
                                wishlistItem.regularPrice
                              )
                              const finalDiscountedPrice = formatPrice(
                                wishlistItem.price
                              )

                              const cartItem = cartItems.filter(
                                (item) => item.id === wishlistItem.id
                              )[0]

                              return (
                                <tr key={key}>
                                  <td className='product-thumbnail'>
                                    <Link
                                      href={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        wishlistItem.id
                                      }
                                    >
                                      <img
                                        className='img-fluid'
                                        src={
                                          process.env.PUBLIC_URL +
                                          wishlistItem.image[0]
                                        }
                                        alt=''
                                      />
                                    </Link>
                                  </td>

                                  <td className='product-name text-center'>
                                    <Link
                                      href={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        wishlistItem.id
                                      }
                                    >
                                      {wishlistItem.name}
                                    </Link>
                                  </td>

                                  <td className='product-price-cart'>
                                    {wishlistItem.discount ? (
                                      <Fragment>
                                        <span className='amount old'>
                                          {finalProductPrice +
                                            currency.currencySymbol}
                                        </span>
                                        <span className='amount new'>
                                          {finalDiscountedPrice +
                                            currency.currencySymbol}
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <span className='amount'>
                                        {finalProductPrice +
                                          currency.currencySymbol}
                                      </span>
                                    )}
                                  </td>

                                  <td className='product-wishlist-cart'>
                                    {wishlistItem.affiliateLink ? (
                                      <a
                                        href={wishlistItem.affiliateLink}
                                        rel='noopener noreferrer'
                                        target='_blank'
                                      >
                                        {' '}
                                        Купить сейчас{' '}
                                      </a>
                                    ) : wishlistItem.variation &&
                                      wishlistItem.variation.length >= 1 ? (
                                      <Link
                                        href={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
                                      >
                                        Выбрать вариант
                                      </Link>
                                    ) : wishlistItem.stock &&
                                      wishlistItem.stock > 0 ? (
                                      <button
                                        onClick={() =>
                                          addToCart(wishlistItem, addToast)
                                        }
                                        className={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                            ? 'active'
                                            : ''
                                        }
                                        disabled={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                        }
                                        title={
                                          wishlistItem !== undefined
                                            ? 'В корзине'
                                            : 'Добавить в корзину'
                                        }
                                      >
                                        {cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? 'В корзине'
                                          : 'Добавить в корзину'}
                                      </button>
                                    ) : (
                                      <button disabled className='active'>
                                        Нет в наличии
                                      </button>
                                    )}
                                  </td>

                                  <td className='product-remove'>
                                    <button
                                      onClick={() =>
                                        removeFromWishlist(
                                          wishlistItem,
                                          addToast
                                        )
                                      }
                                    >
                                      <i className='fa fa-times'></i>
                                    </button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='cart-shiping-update-wrapper'>
                        <div className='cart-shiping-update'>
                          <Link href={'/catalog'}>Продолжить покупки</Link>
                        </div>
                        <div className='cart-clear'>
                          <button
                            onClick={() => removeAllFromWishlist(addToast)}
                          >
                            Очистить список желаний
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
                        <i className='pe-7s-like'></i>
                      </div>
                      <div className='item-empty-area__text'>
                        Нету товаров в списке желаний <br />{' '}
                        <Link href={'/catalog'}>Добавить товары</Link>
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

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  removeAllFromWishlist: PropTypes.func,
  removeFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    currency: state.currencyData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount))
    },
    addToWishlist: (item, addToast, quantityCount) => {
      dispatch(addToWishlist(item, addToast, quantityCount))
    },
    removeFromWishlist: (item, addToast, quantityCount) => {
      dispatch(removeFromWishlist(item, addToast, quantityCount))
    },
    removeAllFromWishlist: (addToast) => {
      dispatch(removeAllFromWishlist(addToast))
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

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
