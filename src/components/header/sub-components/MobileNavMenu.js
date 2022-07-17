import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { multilanguage } from 'redux-multilanguage';

const MobileNavMenu = ({ categories, closeMobileMenu }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li onClick={closeMobileMenu}>
          <Link href={'/catalog?filter_onSale=true'}>
            <a className="red">Скидки</a>
          </Link>
        </li>
        {categories.map(category => (
          <li
            key={category.databaseId}
            className={category.children.length ? 'menu-item-has-children' : ''}
            onClick={e => e.currentTarget.classList.toggle('active')}
          >
            <a>{category.name}</a>
            <span className="menu-expand" onClick={e => e.preventDefault()}>
              <i />
            </span>
            {category.children.length ? (
              <ul className="sub-menu">
                {category.children.map(category => (
                  <li key={category.databaseId}>
                    <Link href={`/catalog/${category.slug}`}>
                      <a>{category.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}

        <li onClick={closeMobileMenu}>
          <Link href={'/installment'}>
            <a>Рассрочка</a>
          </Link>
        </li>
        <li
          className="menu-item-has-children"
          onClick={e => e.currentTarget.classList.toggle('active')}
        >
          <a>Помощь</a>
          <span className="menu-expand" onClick={e => e.preventDefault()}>
            <i />
          </span>
          <ul className="sub-menu">
            <li onClick={closeMobileMenu}>
              <Link href={'/delivery'}>
                <a>Примерка и доставка</a>
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href={'/warranty'}>
                <a>Гарантии</a>
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href={'/payment'}>
                <a>Способы оплаты</a>
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href={'/return'}>
                <a>Возврат и обмен</a>
              </Link>
            </li>
          </ul>
        </li>
        <li onClick={closeMobileMenu}>
          <Link href={'/blog'}>
            <a>Блог</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
  categories: PropTypes.array,
};

export default multilanguage(MobileNavMenu);
