import { multilanguage } from 'redux-multilanguage';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { capitalize, formatProduct } from '../../utils/functions';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_PRODUCTS } from '../../../queries/products';
import client from '../ApolloClient';
import SearchResult from '../searchResult';

const NavMenu = ({ menuWhiteClass, sidebarMenu, categories }) => {
  const order = ['obuv', 'sumki', 'aksessuary'];

  const [isSearchActive, setIsSearchActive] = useState(false);
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

  categories = categories.sort(
    // @ts-ignore
    (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)
  );

  return (
    <div
      className={` ${
        sidebarMenu
          ? 'sidebar-menu'
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ''}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link href={'/catalog'}>
              <a className="red">Скидки</a>
            </Link>
          </li>
          {categories.map(category => (
            <li key={category.databaseId}>
              <Link href={`/catalog/${category.slug}`}>
                <a>
                  {capitalize(category.name)}
                  {category.children.length ? (
                    <i className="fa fa-angle-down" />
                  ) : null}
                </a>
              </Link>
              {category.children.length ? (
                <ul className="submenu">
                  {category.children.map(category => (
                    <li key={category.databaseId}>
                      <Link href={`/catalog/${category.slug}`}>
                        <a>{capitalize(category.name)}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li>
            <Link href={'/installment'}>
              <a>Рассрочка</a>
            </Link>
          </li>
          <li>
            <a>
              Помощь
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right" />
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </a>
            <ul className="submenu">
              <li>
                <Link href={'/delivery'}>
                  <a>Примерка и доставка</a>
                </Link>
              </li>
              <li>
                <Link href={'/warranty'}>
                  <a>Гарантии</a>
                </Link>
              </li>
              <li>
                <Link href={'/payment'}>
                  <a>Способы оплаты</a>
                </Link>
              </li>
              <li>
                <Link href={'/return'}>
                  <a>Возврат и обмен</a>
                </Link>
              </li>
              <li>
                <Link href={'/faq'}>
                  <a>Часто задаваемые вопросы</a>
                </Link>
              </li>
            </ul>
          </li>
          <li style={{ visibility: isSearchActive ? 'hidden' : 'visible' }}>
            <div className="search-bar">
              <div
                className={`search-icon  ${isSearchActive ? '' : ''}`}
                onClick={() => {
                  setSearchResults([]);
                  setSearchQuery('');
                  setIsSearchActive(!isSearchActive);
                }}
              >
                <i className="pe-7s-search" />
              </div>
            </div>
          </li>
        </ul>
        <div className={`search-input ${isSearchActive ? 'active' : ''}`}>
          <input
            type="text"
            placeholder="Поиск"
            value={searchQuery}
            onChange={searchData}
          />

          <div
            className="search-icon ml-2"
            onClick={() => {
              setSearchResults([]);
              setSearchQuery('');
              setIsSearchActive(!isSearchActive);
            }}
          >
            <i className="pe-7s-search" />
          </div>

          {loading && !searchResults.length ? (
            <div className="search-content active">
              <div className="search-result">Загрузка...</div>
            </div>
          ) : searchQuery.length && !searchResults.length ? (
            <div className="search-content active">
              <div className="search-result">Товары не найдены</div>
            </div>
          ) : searchResults.length ? (
            <div className="search-content active">
              <div className="search-result mt-3">
                {searchResults.map(product => (
                  <SearchResult key={product.id} product={product} />
                ))}
                <div className="w-100 d-flex justify-content-center pb-3">
                  <Link href={`/catalog?filter_search=${searchQuery}`}>
                    <a>Посмотреть все</a>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
  categories: PropTypes.array,
};

export default multilanguage(NavMenu);
