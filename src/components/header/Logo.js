import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

const Logo = ({ imageUrl, logoClass, onClick }) => {
  return (
    <div
      className={`${logoClass ? logoClass : ''}`}
      style={{ margin: '5px 0' }}
    >
      {!onClick ? (
        <Link href="/">
          <a>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/new-logo.png`}
              style={{ maxHeight: '40px' }}
            />
          </a>
        </Link>
      ) : (
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/new-logo.png`}
          style={{ maxHeight: '40px', cursor: 'pointer' }}
          onClick={onClick}
        />
      )}
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
  onClick: PropTypes.func,
};

export default Logo;
