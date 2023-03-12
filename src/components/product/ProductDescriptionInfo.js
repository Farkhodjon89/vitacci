import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';

import { connect } from 'react-redux';
import { getProductCartQty } from '../../helpers/product';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist } from '../../redux/actions/wishlistActions';
import { addToCompare } from '../../redux/actions/compareActions';
import Rating from './sub-components/ProductRating';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import SizesModal from '../sizesModal';
import { attributesMap } from '../../utils/functions';
import BuyNowModal from '../BuyNowModal';
import { formatPrice } from '../../utils/functions';

const colorsMap = {
  bezhevyj: 'maroon',
  zelenyj: 'green',
  krasnij: 'red',
  krasnyj: 'red',
  chernyj: 'black',
  beliy: 'grey',
  siniy: 'blue',
  jeltiy: 'yellow',
  korichnevyj: 'brown',
};

const storeImages = {
  867: `${process.env.PUBLIC_URL}/stores/poytaht.png`,
  1473: `${process.env.PUBLIC_URL}/stores/atlas.svg`,
  // 1889: `${process.env.PUBLIC_URL}/stores/poytaht.png`,
  7684: `${process.env.PUBLIC_URL}/stores/magic.svg`,
};

const ProductDescriptionInfo = ({
  product,
  variation,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  addToast,
  addToCart,
  addToWishlist,
  setProduct,
  setVariation,
  setSelectedColorForTitle,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [buyNowModal, setBuyNowModal] = useState(false);
  const [buyNowData, setBuyNowData] = useState(null);

  const attributes = [];

  for (const attribute of product.attributes) {
    if (!['pa_color', 'pa_size', 'pa_top_variation'].includes(attribute.name.toLowerCase())) {
      attributes.push(
        <div className="pro-details-meta" key={attribute.name.toLowerCase()}>
          <span>
            {attributesMap[attribute.name] ? attributesMap[attribute.name].name : attribute.name}:
          </span>
          <ul>
            {attribute.options.map((single, key) => (
              <li key={key}>{single}</li>
            ))}
          </ul>
        </div>,
      );
    }
  }

  const colors = [];

  if (product.topVariations.length) {
    for (const variation of product.topVariations) {
      const color = variation.attributes.find(
        (attribute) => attribute.name.toLowerCase() === 'pa_color',
      );

      if (color) {
        colors.push({
          value: color.options[0],
          id: variation.id,
          image: variation.image,
        });
      }
    }
  } else {
    const color = product.attributes.find(
      (attribute) => attribute.name.toLowerCase() === 'pa_color',
    );

    if (color) {
      colors.push({
        value: color.options[0],
        id: product.id,
        image: product.image,
      });
    }
  }

  let sizes = [];

  for (const variation of product.variations) {
    const size = variation.attributes.find(
      (attribute) => attribute.name.toLowerCase() === 'pa_size',
    );
    if (size) {
      sizes.push({
        value: size.value,
        id: variation.id,
        qty: variation.stockStores[0].qty,
      });
    }
  }

  if (sizes.length && !isNaN(parseFloat(sizes[0].value.replace(',', '.')))) {
    sizes = sizes.sort(
      (a, b) => parseFloat(a.value.replace(',', '.')) - parseFloat(b.value.replace(',', '.')),
    );
  }

  if (variation && !colors.length) {
    const color = variation.attributes.find(
      (attribute) => attribute.name.toLowerCase() === 'pa_color',
    );

    if (color) {
      colors.push({ id: variation.id, value: color.option, disabled: true });
    }
  }

  const initialSize =
    variation &&
    variation.attributes.find((attribute) => attribute.name.toLowerCase() === 'pa_size');

  const [selectedProductColor, setSelectedProductColor] = useState(colors[0] ? colors[0] : '');
  const [selectedProductSize, setSelectedProductSize] = useState(
    (initialSize && initialSize.value) || (sizes[0] ? sizes[0].value : ''),
  );

  useEffect(() => {
    if (selectedProductColor && selectedProductColor.value) {
      setSelectedColorForTitle(selectedProductColor.value);
    }
  }, [selectedProductColor]);

  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock,
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQty(
    cartItems,
    product,
    selectedProductColor.value,
    selectedProductSize,
  );

  useEffect(() => {
    if (colors.length) {
      const color = colors.find((option) => option.id === product.id);

      if (color) {
        setSelectedProductColor(color);
      }
    } else {
      const color = product.attributes.find(
        (attribute) => attribute.name.toLowerCase() === 'pa_color',
      );

      if (color) {
        setSelectedProductColor({
          value: color.options[0],
          id: product.id,
          image: product.image,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (product.type === 'SIMPLE') {
      const size = product.attributes.find(
        (attribute) => attribute.name.toLowerCase() === 'pa_size',
      );

      if (size && sizes.length) {
        setSelectedProductSize(sizes[0].value);
      }
    } else {
      const size = product.variations[0]?.attributes.find(
        (attribute) => attribute.name.toLowerCase() === 'pa_size',
      );
      setSelectedProductSize(size?.value);
    }
  }, [product]);

  return (
    <div className="product-details-content ml-70">
      <div className="jokiNamePrice">
        <h2>{product.name}</h2>
        <div className="product-details-price">
          {product.discount ? (
            <Fragment>
              <span className="new">{finalDiscountedPrice + currency.currencySymbol}</span>
              <span className="old">{finalProductPrice + currency.currencySymbol}</span>
            </Fragment>
          ) : (
            <span>{finalProductPrice + currency.currencySymbol} </span>
          )}
        </div>
        <div className='zoodpay-block'>
        <div className='zoodpay-price' style={{display: "flex", color: "#dc3545", fontWeight: "bold", fontSize: "21px", fontFamily: "ArsenalRegular"}}>{ formatPrice(Math.round(parseInt(product.discount ? finalDiscountedPrice.replace(/\s/g, '') : finalProductPrice.replace(/\s/g, '')) / 4 )) + currency.currencySymbol} * 4 мес.
        </div>
        <div className='zoodpay-info'>?<div className='zoodpay-content'>Месячный платеж при оплате в рассрочку через ZoodPay. <Link href="/installment"><a>Подробнее.</a></Link></div></div>
        </div>
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="pro-details-size-color">
        {colors.length ? (
          <div className="pro-details-color-wrap">
            <div className="jokiColor">
              <strong>Цвет:</strong>{' '}
              {/* <span className="d-inline text-grey">
                {selectedProductColor.value}
              </span> */}
              <div className="pro-details-color-content">
                {colors.map((single, key) => {
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        setSelectedProductColor(single);
                        setProduct(single);
                      }}
                      className={`img-radio mr-1 ${
                        single.value === selectedProductColor.value &&
                        single.id === selectedProductColor.id
                          ? 'checked'
                          : ''
                      }`}
                      style={{ backgroundImage: `url(${single.image[0]})` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {sizes.length ? (
        <div className="pro-details-size-color">
          <div className="pro-details-size w-100">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Размер: {selectedProductSize} </strong>
              </div>
              {sizes.length ? (
                <div className="size-table">
                  <a onClick={() => setModalShow(true)}>Размерная сетка</a>
                </div>
              ) : null}
            </div>
            <div className="pro-details-size-content">
              {sizes.map((single, key) => {
                return (
                  <label
                    className={`${'pro-details-size-content--single'} ${
                      single.qty === 0 ? 'jokiEmpty' : ''
                    } `}
                    key={key}>
                    <input
                      type="radio"
                      value={single.value}
                      checked={single.value === selectedProductSize ? 'checked' : ''}
                      onChange={() => {
                        setSelectedProductSize(single.value);
                        setVariation(single);
                      }}
                      disabled={single.qty === 0 ? true : false}
                    />
                    <span className="size-name">{single.value}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {(variation && variation.stockStores) || product.stockStores ? (
        <div className="mt-4 pro-details-size-color flex-wrap">
          <div className="w-100">В наличии</div>

          <div className="d-flex w-100">
            {((variation && variation.stockStores) || product.stockStores).map((x, i) => (
              <div key={i} className="stock-store">
                <img src={storeImages[x.officeID]} alt={x.officeName} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
              Купить сейчас
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          {/*<div className="cart-plus-minus">*/}
          {/*  <button*/}
          {/*    onClick={() =>*/}
          {/*      setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)*/}
          {/*    }*/}
          {/*    className="dec qtybutton"*/}
          {/*  >*/}
          {/*    -*/}
          {/*  </button>*/}
          {/*  <input*/}
          {/*    className="cart-plus-minus-box"*/}
          {/*    type="text"*/}
          {/*    value={quantityCount}*/}
          {/*    readOnly*/}
          {/*  />*/}
          {/*  <button*/}
          {/*    onClick={() =>*/}
          {/*      setQuantityCount(*/}
          {/*        quantityCount < productStock - productCartQty*/}
          {/*          ? quantityCount + 1*/}
          {/*          : quantityCount*/}
          {/*      )*/}
          {/*    }*/}
          {/*    className="inc qtybutton"*/}
          {/*  >*/}
          {/*    +*/}
          {/*  </button>*/}
          {/*</div>*/}
          <div className="pro-details-cart btn-hover ml-0">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProductColor.value,
                    selectedProductSize,
                    variation,
                  )
                }
                disabled={productCartQty >= productStock}>
                {'Добавить в корзину'}{' '}
              </button>
            ) : (
              <button disabled> Нет в наличии</button>
            )}
          </div>
          <div className="pro-details-cart btn-hover ml-0">
            {productStock && productStock > 0 ? (
              <button
                onClick={() => {
                  setBuyNowModal(true);
                  setBuyNowData({
                    ...product,
                    variation,
                    quantity: quantityCount,
                    selectedProductColor: selectedProductColor.value
                      ? selectedProductColor.value
                      : product.selectedProductColor
                      ? product.selectedProductColor
                      : null,
                    selectedProductSize: selectedProductSize.value
                      ? selectedProductSize.value
                      : product.selectedProductSize
                      ? product.selectedProductSize
                      : null,
                  });
                }}
                disabled={productCartQty >= productStock}>
                {'Купить сейчас'}{' '}
              </button>
            ) : (
              <button disabled> Нет в наличии</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? 'active' : ''}
              disabled={wishlistItem !== undefined}
              title={wishlistItem !== undefined ? 'В желаниях' : 'Добавить в список желаний'}
              onClick={() => addToWishlist(product, addToast)}>
              <i className="pe-7s-like" />
            </button>
          </div>
          {/*<div className="pro-details-compare">*/}
          {/*  <button*/}
          {/*    className={compareItem !== undefined ? 'active' : ''}*/}
          {/*    disabled={compareItem !== undefined}*/}
          {/*    title={*/}
          {/*      compareItem !== undefined*/}
          {/*        ? 'Added to compare'*/}
          {/*        : 'Add to compare'*/}
          {/*    }*/}
          {/*    onClick={() => addToCompare(product, addToast)}*/}
          {/*  >*/}
          {/*    <i className="pe-7s-shuffle" />*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      )}

      <div className="product-terms mt-3">
        <Accordion className="mb-3" defaultActiveKey={product.shortDescription ? '4' : ''}>
          {product.shortDescription ? (
            <Card className="single-my-account mb-2">
              <Card.Header className="panel-heading">
                <Accordion.Toggle variant="link" eventKey="4">
                  <h3 className="panel-title px-3 py-2">Описание</h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ) : null}
          {attributes.length ? (
            <Card className="single-my-account mb-2">
              <Card.Header className="panel-heading">
                <Accordion.Toggle variant="link" eventKey="3">
                  <h3 className="panel-title px-3 py-2">Детали</h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>{attributes}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ) : null}
          <Card className="single-my-account mb-2">
            <Card.Header className="panel-heading">
              <Accordion.Toggle variant="link" eventKey="0">
                <h3 className="panel-title px-3 py-2">Доставка и оплата</h3>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>
                  <strong>Доставка</strong>
                  <br />
                  *Бесплатная доставка при заказе от 1 000 000 сум по Ташкенту осуществляетсяв течении 48 часов с момента
                  заказа.
                  <br />
                  *Бесплатная доставка по регионам осуществляется в течение 2-3 рабочих дней, в
                  соответствии с графиком работы курьерских служб.
                  <br />
                  <strong>Способы оплаты</strong>
                  <br />
                  - Оплата наличными при получении заказа
                  <br />
                  - Оплата через платежные система PAYME, CLICK
                  <br />- 100% Предоплата (при доставки по регионам)
                </p>
                <Link href="/delivery">
                  <a>Подробнее</a>
                </Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="single-my-account mb-2">
            <Card.Header className="panel-heading">
              <Accordion.Toggle variant="link" eventKey="1">
                <h3 className="panel-title px-3 py-2">Возврат и обмен</h3>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>
                  <strong>Возврат</strong>
                  <br />
                  Вернуть товар так же легко, как и заказать! Вы можете вернуть{' '}
                  <strong>новый, неношеный товар*</strong> в течение{' '}
                  <strong>14 календарных дней</strong>, не считая дня покупки. Средства по уходу за
                  обувью обмену и возврату не подлежат.
                  <br />
                  <strong>Обмен</strong>
                  <br />
                  Вам не подошел размер? Вы можете обменять купленный товар в течение 14 дней с
                  момента покупки товара. Обменять товар можно на аналогичный товар другого размера.
                  Вам нужно будет сначала сдать купленный товар, а потом приобрести новый. Обмен
                  производится только в офлайн магазинах VITACCI в Ташкенте.
                </p>
                <Link href="/return">
                  <a>Подробнее</a>
                </Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {product.category ? (
          <div className="pro-details-meta">
            <span>Категории:</span>
            <ul>
              {product.category.map((single, key) => {
                return (
                  <li key={key}>
                    <Link href={`/catalog/${single.slug}`}>
                      <a>{single.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ''
        )}

        <div className="pro-details-meta">
          <span>Артикул:</span>
          <ul>
            <li>{variation?.sku || product?.sku}</li>
          </ul>
        </div>
      </div>

      <SizesModal show={modalShow} onHide={() => setModalShow(false)} />

      <BuyNowModal
        key={buyNowModal}
        show={buyNowModal}
        onHide={() => setBuyNowModal(false)}
        buyNowData={buyNowData}
      />
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  finalDiscountedPrice: PropTypes.string,
  finalProductPrice: PropTypes.string,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
  setProduct: PropTypes.func,
  setVariation: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize,
      variation,
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize,
          variation,
        ),
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
