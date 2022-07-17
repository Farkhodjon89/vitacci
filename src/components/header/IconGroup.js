import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { connect } from 'react-redux';
import MenuCart from './sub-components/MenuCart';
import { removeFromCart } from '../../redux/actions/cartActions';
import { getDiscountPrice } from '../../helpers/product';
import { formatPrice, formatProduct } from '../../utils/functions';
import SearchResult from '../searchResult';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_PRODUCTS } from '../../../queries/products';
import client from '../ApolloClient';
import NoSsr from '../NoSsr';

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  removeFromCart,
  iconWhiteClass,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [loadProducts, { data, loading }] = useLazyQuery(SEARCH_PRODUCTS, {
    client,
  });

  const searchData = e => {
    setSearchResults([]);
    setSearchQuery(e.target.value);

    if (e.target.value.length) {
      loadProducts({
        variables: {
          first: 10,
          search: e.target.value,
        },
      });
    }
  };

  useEffect(() => {
    if (data && searchQuery.length) {
      setSearchResults(data.products.nodes.map(formatProduct));
    }
  }, [data]);

  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle('active');
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      '#offcanvas-mobile-menu'
    );
    offcanvasMobileMenu.classList.add('active');
  };

  let cartTotalPrice = 0;

  for (const single of cartData) {
    const finalProductPrice = single.regularPrice;
    const finalDiscountedPrice = single.price;

    single.discount
      ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
      : (cartTotalPrice += finalProductPrice * single.quantity);
  }

  return (
    <div
      className={`header-right-wrap align-items-center ${
        iconWhiteClass ? iconWhiteClass : ''
      }`}
    >
      {/*<div*/}
      {/*  className="same-style header-search d-none d-lg-block"*/}
      {/*  style={{ width: '40%' }}*/}
      {/*>*/}
      {/*  <div className="d-flex">*/}
      {/*    <div className="search-icon">*/}
      {/*      <i className="pe-7s-search" />*/}
      {/*    </div>*/}

      {/*    <div className="search-input">*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        placeholder="Поиск"*/}
      {/*        value={searchQuery}*/}
      {/*        onChange={searchData}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  {loading && !searchResults.length ? (*/}
      {/*    <div className="search-content active">*/}
      {/*      <div className="search-result">Загрузка...</div>*/}
      {/*    </div>*/}
      {/*  ) : searchQuery.length && !searchResults.length ? (*/}
      {/*    <div className="search-content active">*/}
      {/*      <div className="search-result">Товары не найдены</div>*/}
      {/*    </div>*/}
      {/*  ) : searchResults.length ? (*/}
      {/*    <div className="search-content active">*/}
      {/*      <div className="search-result mt-3">*/}
      {/*        {searchResults.map(product => (*/}
      {/*          <SearchResult key={product.id} product={product} />*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ) : null}*/}
      {/*</div>*/}

      <div className="same-style header-wishlist">
        <Link href={'/wishlist'}>
          <a>
            <i className="pe-7s-like" />
            <NoSsr>
              <span className="count-style">
                {wishlistData && wishlistData.length ? wishlistData.length : 0}
              </span>
            </NoSsr>
          </a>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <NoSsr>
            <span className="count-style">
              {cartData && cartData.length ? cartData.length : 0}
            </span>
          </NoSsr>
        </button>

        {/* menu cart */}
        <NoSsr>
          <MenuCart
            cartData={cartData}
            currency={currency}
            removeFromCart={removeFromCart}
          />
        </NoSsr>
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link href={'/cart'}>
          <a className="icon-cart">
            <i className="pe-7s-shopbag" />
            <NoSsr>
              <span className="count-style">
                {cartData && cartData.length ? cartData.length : 0}
              </span>
            </NoSsr>
          </a>
        </Link>
      </div>
      <NoSsr>
        {cartTotalPrice ? (
          <div className="ml-3">
            <span>{formatPrice(cartTotalPrice) + currency.currencySymbol}</span>
          </div>
        ) : (
          ''
        )}
      </NoSsr>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  removeFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
