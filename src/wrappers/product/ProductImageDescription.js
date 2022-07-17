import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../helpers/product';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductDescriptionInfo from '../../components/product/ProductDescriptionInfo';
import ProductImageGallerySideThumb from '../../components/product/ProductImageGallerySideThumb';
import ProductImageFixed from '../../components/product/ProductImageFixed';
import { formatPrice } from '../../utils/functions';

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  setSelectedColorForTitle,
  product,
  variation,
  currency,
  cartItems,
  wishlistItems,
  compareItems,
  setProduct,
  setVariation,
}) => {
  const wishlistItem = wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0];
  const compareItem = compareItems.filter((compareItem) => compareItem.id === product.id)[0];
  const { addToast } = useToasts();

  const finalProductPrice = formatPrice(variation ? variation.regularPrice : product.regularPrice);
  const finalDiscountedPrice = formatPrice(variation ? variation.price : product.price);

  // galleryType = 'fixedImage';

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {product.image.length > 1 ? (
              <ProductImageGallerySideThumb product={product} thumbPosition="left" />
            ) : (
              <ProductImageFixed product={product} />
            )}

            {/*{galleryType === 'leftThumb' ? (*/}
            {/*  <ProductImageGallerySideThumb*/}
            {/*    product={product}*/}
            {/*    thumbPosition="left"*/}
            {/*  />*/}
            {/*) : galleryType === 'rightThumb' ? (*/}
            {/*  <ProductImageGallerySideThumb product={product} />*/}
            {/*) : galleryType === 'fixedImage' ? (*/}
            {/*  <ProductImageFixed product={product} />*/}
            {/*) : (*/}
            {/*  <ProductImageGallery product={product} />*/}
            {/*)}*/}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              setSelectedColorForTitle={setSelectedColorForTitle}
              product={product}
              variation={variation}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              addToast={addToast}
              setProduct={setProduct}
              setVariation={setVariation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  variation: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array,
  setProduct: PropTypes.func,
  setVariation: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
