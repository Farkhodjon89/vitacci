import React, { useEffect } from 'react';
import MobileMenuSearch from './sub-components/MobileSearch';
import MobileNavMenu from './sub-components/MobileNavMenu';
import MobileLangCurChange from './sub-components/MobileLangCurrChange';
import MobileWidgets from './sub-components/MobileWidgets';
import PropTypes from 'prop-types';

const MobileMenu = ({ categories }) => {
  // useEffect(() => {
  //   const offCanvasNav = document.querySelector('#offcanvas-navigation');
  //   const offCanvasNavSubMenu = offCanvasNav.querySelectorAll('.sub-menu');
  //
  //   for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
  //     offCanvasNavSubMenu[i].insertAdjacentHTML(
  //       'beforebegin',
  //       "<span class='menu-expand'><i/></span>"
  //     );
  //   }
  //
  //   const menuExpand = offCanvasNav.querySelectorAll('.menu-expand');
  //
  //   for (let i = 0; i < menuExpand.length; i++) {
  //     menuExpand[i].addEventListener('click', sideMenuExpand);
  //   }
  // });

  const sideMenuExpand = e => {
    e.currentTarget.parentElement.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      '#offcanvas-mobile-menu'
    );
    offcanvasMobileMenu.classList.remove('active');
  };

  return (
    <div className="offcanvas-mobile-menu" id="offcanvas-mobile-menu">
      <button
        className="offcanvas-menu-close"
        id="mobile-menu-close-trigger"
        onClick={() => closeMobileMenu()}
      >
        <i className="pe-7s-close" />
      </button>
      <div className="offcanvas-wrapper">
        <div className="offcanvas-inner-content">
          {/* mobile search */}
          {/*<MobileMenuSearch />*/}

          {/* mobile nav menu */}
          <MobileNavMenu
            closeMobileMenu={closeMobileMenu}
            categories={categories}
          />

          {/* mobile language and currency */}
          {/*<MobileLangCurChange />*/}

          {/* mobile widgets */}
          <MobileWidgets />
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  categories: PropTypes.array,
};

export default MobileMenu;
