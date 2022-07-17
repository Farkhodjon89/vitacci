import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { HeadData } from '../components/Head';
import { connect } from 'react-redux';
import { BreadcrumbsItem, BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumb from '../wrappers/breadcrumb/Breadcrumb';
import { formatPrice } from '../utils/functions';
import FeatureIcon from '../wrappers/feature-icon/FeatureIcon';
import Logo from '../components/header/Logo';
import CheckoutModal from '../components/checkoutModal';
import SuccessCheckoutModal from '../components/SuccessCheckoutModal';
import Spinner from 'react-bootstrap/Spinner';
import { removeAllFromCart } from '../redux/actions/cartActions';
import axios from 'axios';
import sha512 from 'js-sha512';
import validator from 'validator';

const Checkout = ({ cartItems, currency, removeAllFromCart }) => {
  const host =
    process.env.NODE_ENV === 'production' ? 'https://vitacci.uz/' : 'http://localhost:3000';

  const paymentMethods = [
    { title: 'Наличные', value: 'cod' },
    { title: 'Click', value: 'click' },
    { title: 'PayMe', value: 'payme' },
    { title: 'Zoodpay', value: 'zoodpay' },
  ];

  const router = useRouter();

  const [order, setOrder] = useState();

  const [exitModalShow, setExitModalShow] = useState(false);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const countries = [
    'Выберите город / область',
    'Ташкент',
    'Ташкентская область',
    'Андижан',
    'Бухара',
    'Джизак',
    'Кашкадарья',
    'Навоий',
    'Наманган',
    'Самарканд',
    'Сурхандарья',
    'Фергана',
    'Хорезм',
  ];

  let cartTotalPrice = cartItems.reduce(
    (sum, item) =>
      (sum += item.discount ? item.price * item.quantity : item.salePrice * item.quantity),
    0,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const lineItems = [];

    for (const product of cartItems) {
      lineItems.push({
        price: product.discount ? product.price : product.salePrice,
        quantity: product.quantity,
        variation_id: product.variation && product.variation.id,
        name: product.name,
        product_id: product.id,
      });
    }

    const paymentData = {
      line_items: lineItems,
      status: 'pending',
      currency: 'UZS',
      payment_method: paymentMethod.value,
      payment_method_title: paymentMethod.title,
      set_paid: false,
      customer_note: comments,
      billing: {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        address_1: `${city}, ${address}`,
        email: email ? email : 'test@gmail.com',
      },
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Бесплатная достава',
          total: '0',
        },
      ],
      shipping: {
        address_1: `${city}, ${address}`,
      },
    };

    const response = await axios.post('/api/order', { order: paymentData });

    if (response.data.status) {
      setOrder(response.data.order);
    }

    setIsLoading(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem('order', JSON.stringify(response.data.order));
    }

    if (paymentMethod.value === 'cod') {
      removeAllFromCart();

      await router.replace(`/order/${response.data.order.id}`, `/order/${response.data.order.id}`);
    } else if (paymentMethod.value === 'zoodpay') {
      axios
        .post('/api/zoodpay', {
          data: {
            customer: {
              customer_email: response.data.order.billing.email,
              customer_phone: response.data.order.billing.phone,
              first_name: response.data.order.billing.first_name,
              customer_dob: '2000-01-01',
            },
            items: response.data.order.line_items.map(({ name, price, quantity }) => ({
              categories: [['test', 'test']],
              name: name,
              price: price,
              quantity: quantity,
            })),
            order: {
              amount: parseInt(response.data.order.total).toFixed(2),
              currency: 'UZS',
              market_code: 'UZ',
              merchant_reference_no: response.data.order.id.toString(),
              service_code: 'ZPI',
              lang: 'ru',
              signature: sha512(
                `Vit@CciuZ|${response.data.order.id}|${response.data.order.total}|UZS|UZ|?v232n^C`,
              ),
            },
            shipping: {
              address_line1: response.data.order.billing.address_1,
              country_code: 'UZB',
              name: response.data.order.billing.first_name,
              zipcode: '100000',
            },
          },
        })
        .then((res) => {
          if (res.data.status === 400) {
            // setError({ message: res.data.message, details: res.data.details })
            setIsLoading(false);
          } else {
            axios.post('/api/transaction', {
              id: response.data.order.id,
              transaction_id: res.data.data.transaction_id,
            });
            window.location.assign(res.data.data.payment_url);
            localStorage.clear();
          }
        });
    } else {
      const form = document.querySelector(`#${paymentMethod.value}-form`);

      if (form) {
        form.submit();
      }

      removeAllFromCart();
    }
  };

  const [emailError, setEmailError] = useState();

  const validateEmail = (e) => {
    var email = e.target.value;
    setEmail(email);

    if (validator.isEmail(email)) {
      setEmailError();
    } else {
      setEmailError('Неверный Email');
    }
  };

  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData title={'Оформление заказа'} pageUrl="/checkout" />

        <div className="d-flex flex-column" style={{ height: '100vh' }}>
          <div className="container p-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="col">
                <Logo
                  imageUrl="/assets/img/logo/logo.webp"
                  onClick={() => setExitModalShow(true)}
                />
              </div>
              <div className="col text-right">
                <strong>Нужна помощь?</strong> &nbsp;
                <br />
                <a href="tel:+998909256000">+998 90 925 60 00</a>
              </div>
            </div>
          </div>
          <BreadcrumbsItem
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setExitModalShow(true);
            }}
            to={'/'}>
            Главная
          </BreadcrumbsItem>
          <BreadcrumbsItem to={'/checkout'}>Оформление заказа</BreadcrumbsItem>
          {/* breadcrumb */}
          <Breadcrumb />
          <div style={{ flex: '1 0 auto' }} className="checkout-area pt-95 pb-5">
            <div className="container">
              <form onSubmit={handleSubmit}>
                {cartItems && cartItems.length >= 1 ? (
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="billing-info-wrap">
                        <h3>Платежные реквизиты</h3>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>
                                Имя
                                <span>*</span>
                              </label>
                              <input
                                required
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>
                                Фамилия
                                <span>*</span>
                              </label>
                              <input
                                required
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="billing-select mb-20">
                              <label>Город / Область</label>
                              <select value={city} onChange={(e) => setCity(e.target.value)}>
                                {countries.map((value, i) => (
                                  <option key={i} value={value} disabled={i === 0}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>
                                Адрес
                                <span>*</span>
                              </label>
                              <input
                                required
                                className="billing-address"
                                placeholder="Район, улица, номер дома или квартиры"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>
                                Номер телефона
                                <span>*</span>
                              </label>
                              <input
                                required
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>
                                Email (опционально)
                                <span style={{ color: 'red', marginLeft: '5px' }}>
                                  {emailError}
                                </span>
                              </label>
                              <input type="text" value={email} onChange={(e) => validateEmail(e)} />
                            </div>
                          </div>
                        </div>

                        <div className="additional-info-wrap">
                          <h4>Дополнительная информация</h4>
                          <div className="additional-info">
                            <label>Комментарии к заказу</label>
                            <textarea
                              placeholder="Комментарии к Вашему заказу, например, заметки для доставки"
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div className="your-order-area">
                        <h3>Ваш заказ</h3>
                        <div className="your-order-wrap gray-bg-4">
                          <div className="your-order-product-info">
                            <div className="your-order-top">
                              <ul>
                                <li className="title">Товар</li>
                                <li>Всего</li>
                              </ul>
                            </div>
                            <div className="your-order-middle">
                              <ul>
                                {cartItems.map((cartItem, key) => (
                                  <li key={key}>
                                    <span className="order-middle-left sub-title">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{' '}
                                    <span className="order-price">
                                      {cartItem.discount
                                        ? formatPrice(
                                            (cartItem.price * cartItem.quantity).toFixed(2),
                                          ) + currency.currencySymbol
                                        : formatPrice(
                                            (cartItem.salePrice * cartItem.quantity).toFixed(2),
                                          ) + currency.currencySymbol}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="your-order-bottom">
                              <ul>
                                <li className="your-order-shipping sub-title">Доставка</li>
                                <li>Бесплатная доставка</li>
                              </ul>
                            </div>
                            <div className="your-order-total">
                              <ul>
                                <li className="order-total title">Всего</li>
                                <li>
                                  {formatPrice(cartTotalPrice.toFixed(2)) + currency.currencySymbol}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="payment-method">
                            <h4>Способ оплаты:</h4>
                            {paymentMethods.map((method, i) => {
                              function inRange(x) {
                                return (x - 150000) * (x - 5500000) >= 0;
                              }
                              return (
                                <div key={i} className="categories-check">
                                  <button
                                    type="button"
                                    onClick={() => setPaymentMethod(method)}
                                    className={`${
                                      paymentMethod.value === method.value ? 'active' : ''
                                    } ${
                                      method.value === 'zoodpay' &&
                                      inRange(parseInt(cartTotalPrice))
                                        ? 'zoodpay'
                                        : ''
                                    } `}
                                    disabled={
                                      method.value === 'zoodpay' &&
                                      inRange(parseInt(cartTotalPrice))
                                        ? true
                                        : false
                                    }>
                                    <span className="checkmark" /> {method.title}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            <br />
                            <b>
                              Zoodpay - покупка товара в рассрочку в 4 платежей . Минимальная сумма
                              - 150 000 сум.
                              <br />
                              Максимальная сумма - 5 500 000 сум.
                            </b>
                          </div>
                          {paymentMethod.value === 'zoodpay' && !email && (
                            <div style={{ color: 'red' }}>При выборе Zoodpay Email обязателен</div>
                          )}
                        </div>
                        <div className="place-order mt-25">
                          <button
                            type="submit"
                            className="btn-hover"
                            disabled={isLoading || (paymentMethod.value === 'zoodpay' && !email)}>
                            {isLoading ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              'Оформить заказ'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="item-empty-area text-center">
                        <div className="item-empty-area__icon mb-30">
                          <i className="pe-7s-cash" />
                        </div>
                        <div className="item-empty-area__text">
                          Не найдено товаров для оформления
                          <br />
                          <Link href={'/catalog'}>
                            <a>Продолжить покупки</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              <form id="payme-form" method="post" action="https://checkout.paycom.uz">
                <input type="hidden" name="merchant" value="5f4a1f4c1d8bbeb111fb3fea" />

                <input type="hidden" name="amount" value={cartTotalPrice * 100} />

                <input type="hidden" name="account[phone]" value={phoneNumber.replace('+', '')} />

                <input type="hidden" name="account[order_id]" value={order && order.id} />

                <input type="hidden" name="lang" value="ru" />

                <input type="hidden" name="callback" value={`${host}/order/${order && order.id}`} />
              </form>

              <form id="click-form" method="get" action="https://my.click.uz/services/pay">
                <input type="hidden" name="merchant_id" value="11678" />
                <input type="hidden" name="transaction_param" value={order && order.id} />
                <input type="hidden" name="service_id" value="16521" />
                <input type="hidden" name="amount" value={cartTotalPrice} />
                <input
                  type="hidden"
                  name="return_url"
                  value={`${host}/order/${order && order.id}`}
                />
              </form>

              <FeatureIcon
                className="mt-5"
                spaceBottomClass="pt-70"
                containerClass="container"
                responsiveClass="res-mrg-md-mt"
              />
            </div>
          </div>
          <div className="bg-black">
            <div className="container p-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="col text-right text-white">
                  <strong>Нужна помощь?</strong> &nbsp;
                  <a href="tel:+998909256000" className="text-white">
                    +998 90 925 60 00
                  </a>
                </div>
              </div>
            </div>
          </div>
          <SuccessCheckoutModal show={successModalShow} onHide={() => setSuccessModalShow(false)} />
          <CheckoutModal show={exitModalShow} onHide={() => setExitModalShow(false)} />
        </div>
      </Fragment>
    </BreadcrumbsProvider>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    removeAllFromCart: PropTypes.func,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAllFromCart: (addToast) => {
      dispatch(removeAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
