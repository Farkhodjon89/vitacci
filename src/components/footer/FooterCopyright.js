import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

const FooterCopyright = ({ footerLogo, spaceBottomClass }) => {
  return (
    <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="footer-logo">
        <Link href={'/'}>
          <img className="footer-logo" alt="Logo" src={footerLogo} />
        </Link>
      </div>
      <p>
        © 2020{' '}
        <a href="//hasthemes.com" rel="noopener noreferrer" target="_blank">
          Vitacci
        </a>
        .<br /> Все права защищены
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default FooterCopyright;
