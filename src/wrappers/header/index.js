import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Logo from '../../components/header/Logo';
import NavMenu from '../../components/header/NavMenu';
import IconGroup from '../../components/header/IconGroup';
import MobileMenu from '../../components/header/MobileMenu';
import HeaderTop from '../../components/header/HeaderTop';

const Header = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerBgClass,
  categories,
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector('.sticky-bar');
    setHeaderTop(header.offsetTop);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ''}`}
    >
      <div
        className={`${headerPaddingClass ? headerPaddingClass : ''} ${
          top === 'visible' ? 'd-none d-lg-block' : 'd-none'
        } header-top-area ${
          borderStyle === 'fluid-border' ? 'border-none' : ''
        }`}
      >
        <div className={layout === 'container-fluid' ? layout : 'container'}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={` ${
          headerPaddingClass ? headerPaddingClass : ''
        } sticky-bar header-res-padding clearfix ${
          scroll > headerTop ? 'stick' : ''
        }`}
      >
        <div className={layout === 'container-fluid' ? layout : 'container'}>
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* header logo */}
              <Logo />
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block px-0">
              {/* Nav menu */}
              <NavMenu categories={categories} />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8 px-md-0">
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu categories={categories} />
      </div>
    </header>
  );
};

Header.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
  categories: PropTypes.array,
};

export default Header;
