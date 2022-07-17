import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import HeaderSocial from './sub-components/HeaderSocial';
import NavMenu from './NavMenu';

const OffcanvasMenu = ({ activeState, getActiveState }) => {
  return (
    <div className={`clickable-mainmenu ${activeState ? 'inside' : ''}`}>
      <div className="clickable-mainmenu-icon">
        <button
          className="clickable-mainmenu-close"
          onClick={() => getActiveState(false)}
        >
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link href={'/'}>
          <img alt="" src={'/static/logo.png'} />
        </Link>
      </div>
      {/* nav menu*/}
      <NavMenu sidebarMenu={true} />

      {/* header social */}
      <HeaderSocial />
    </div>
  );
};

OffcanvasMenu.propTypes = {
  activeState: PropTypes.bool,
  getActiveState: PropTypes.func,
};

export default OffcanvasMenu;
