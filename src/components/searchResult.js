import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';

const SearchResult = ({ product }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <a>
        <div className="d-flex my-2 align-items-center">
          <div className="product-image mr-2">
            <img src={product.image[0]} alt={product.name} />
          </div>
          <div className="product-data">{product.name}</div>
        </div>
      </a>
    </Link>
  );
};

SearchResult.propTypes = {
  product: PropTypes.object.isRequired,
};

export default SearchResult;
