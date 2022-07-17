import { v4 } from 'uuid';
import { StaticDataSingleton } from './getStaticData';
import striptags from 'striptags';
import format from 'string-template';

/**
 * Extracts and returns float value from a string.
 *
 * @param {string} string String
 * @return {any}
 */
export const getFloatVal = (string) => {
  let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
  return null !== floatValue ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';
};

/**
 * Add first product.
 *
 * @param {Object} product Product
 * @return {{totalProductsCount: number, totalProductsPrice: any, products: Array}}
 */
export const addFirstProduct = (product) => {
  let productPrice = getFloatVal(product.price);

  let newCart = {
    products: [],
    totalProductsCount: 1,
    totalProductsPrice: productPrice,
  };

  const newProduct = createNewProduct(product, productPrice, 1);
  newCart.products.push(newProduct);

  localStorage.setItem('woo-next-cart', JSON.stringify(newCart));

  return newCart;
};

/**
 * Create a new product object.
 *
 * @param {Object} product Product
 * @param {Integer} productPrice Product Price
 * @param {Integer} qty Quantity
 * @return {{image: *, productId: *, totalPrice: number, price: *, qty: *, name: *}}
 */
export const createNewProduct = (product, productPrice, qty) => {
  return {
    productId: product.productId,
    image: product.image,
    name: product.name,
    price: productPrice,
    qty,
    totalPrice: parseFloat((productPrice * qty).toFixed(2)),
  };
};

/**
 * Updates the existing cart with new item.
 *
 * @param {Object} existingCart Existing Cart.
 * @param {Object} product Product.
 * @param {Integer} qtyToBeAdded Quantity.
 * @param {Integer} newQty New Qty to be updated.
 * @return {{totalProductsCount: *, totalProductsPrice: *, products: *}}
 */
export const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
  const updatedProducts = getUpdatedProducts(existingCart.products, product, qtyToBeAdded, newQty);

  const addPrice = (total, item) => {
    total.totalPrice += item.totalPrice;
    total.qty += item.qty;

    return total;
  };

  // Loop through the updated product array and add the totalPrice of each item to get the totalPrice
  let total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 });

  const updatedCart = {
    products: updatedProducts,
    totalProductsCount: parseInt(total.qty),
    totalProductsPrice: parseFloat(total.totalPrice),
  };

  localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

  return updatedCart;
};

/**
 * Get updated products array
 * Update the product if it exists else,
 * add the new product to existing cart,
 *
 * @param {Object} existingProductsInCart Existing product in cart
 * @param {Object} product Product
 * @param {Integer} qtyToBeAdded Quantity
 * @param {Integer} newQty New qty of the product (optional)
 * @return {*[]}
 */
export const getUpdatedProducts = (
  existingProductsInCart,
  product,
  qtyToBeAdded,
  newQty = false,
) => {
  // Check if the product already exits in the cart.
  const productExitsIndex = isProductInCart(existingProductsInCart, product.productId);

  // If product exits ( index of that product found in the array ), update the product quantity and totalPrice
  if (-1 < productExitsIndex) {
    let updatedProducts = existingProductsInCart;
    let updatedProduct = updatedProducts[productExitsIndex];

    // If have new qty of the product available, set that else add the qtyToBeAdded
    updatedProduct.qty = newQty ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded);
    updatedProduct.totalPrice = parseFloat((updatedProduct.price * updatedProduct.qty).toFixed(2));

    return updatedProducts;
  } else {
    // If product not found push the new product to the existing product array.
    let productPrice = getFloatVal(product.price);
    const newProduct = createNewProduct(product, productPrice, qtyToBeAdded);
    existingProductsInCart.push(newProduct);

    return existingProductsInCart;
  }
};

/**
 * Returns index of the product if it exists.
 *
 * @param {Object} existingProductsInCart Existing Products.
 * @param {Integer} productId Product id.
 * @return {number | *} Index Returns -1 if product does not exist in the array, index number otherwise
 */
const isProductInCart = (existingProductsInCart, productId) => {
  const returnItemThatExits = (item, index) => {
    if (productId === item.productId) {
      return item;
    }
  };

  // This new array will only contain the product which is matched.
  const newArray = existingProductsInCart.filter(returnItemThatExits);

  return existingProductsInCart.indexOf(newArray[0]);
};

/**
 * Remove Item from the cart.
 *
 * @param {Integer} productId Product Id.
 * @return {any | string} Updated cart
 */
export const removeItemFromCart = (productId) => {
  let existingCart = localStorage.getItem('woo-next-cart');
  existingCart = JSON.parse(existingCart);

  // If there is only one item in the cart, delete the cart.
  if (1 === existingCart.products.length) {
    localStorage.removeItem('woo-next-cart');
    return null;
  }

  // Check if the product already exits in the cart.
  const productExitsIndex = isProductInCart(existingCart.products, productId);

  // If product to be removed exits
  if (-1 < productExitsIndex) {
    const productTobeRemoved = existingCart.products[productExitsIndex];
    const qtyToBeRemovedFromTotal = productTobeRemoved.qty;
    const priceToBeDeductedFromTotal = productTobeRemoved.totalPrice;

    // Remove that product from the array and update the total price and total quantity of the cart
    let updatedCart = existingCart;
    updatedCart.products.splice(productExitsIndex, 1);
    updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
    updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;

    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
    return updatedCart;
  } else {
    return existingCart;
  }
};

/**
 * Returns cart data in the required format.
 * @param {String} data Cart data
 */
export const getFormattedCart = (data) => {
  let formattedCart = null;

  if (undefined === data || !data.cart.contents.nodes.length) {
    return formattedCart;
  }

  const givenProducts = data.cart.contents.nodes;

  // Create an empty object.
  formattedCart = {};
  formattedCart.products = [];
  let totalProductsCount = 0;

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts[i].product;
    const product = {};
    const total = getFloatVal(givenProducts[i].total);

    product.productId = givenProduct.productId;
    product.cartKey = givenProducts[i].key;
    product.name = givenProduct.name;
    product.qty = givenProducts[i].quantity;
    product.price = total / product.qty;
    product.totalPrice = givenProducts[i].total;
    product.image = {
      sourceUrl: givenProduct.image.sourceUrl,
      srcSet: givenProduct.image.srcSet,
      title: givenProduct.image.title,
    };

    totalProductsCount += givenProducts[i].quantity;

    // Push each item into the products array.
    formattedCart.products.push(product);
  }

  formattedCart.totalProductsCount = totalProductsCount;
  formattedCart.totalProductsPrice = data.cart.total;

  return formattedCart;
};

export const createCheckoutData = (order) => {
  const checkoutData = {
    clientMutationId: v4(),

    billing: {
      firstName: order.firstName,
      lastName: order.lastName,
      address1: order.address1,
      address2: order.address2,
      city: order.city,
      country: order.country,
      state: order.state,
      postcode: order.postcode,
      email: order.email,
      phone: order.phone,
      company: order.company,
    },
    shipping: {
      firstName: order.firstName,
      lastName: order.lastName,
      address1: order.address1,
      address2: order.address2,
      city: order.city,
      country: order.country,
      state: order.state,
      postcode: order.postcode,
      email: order.email,
      phone: order.phone,
      company: order.company,
    },
    shipToDifferentAddress: false,
    paymentMethod: order.paymentMethod,
    isPaid: false,
    transactionId: 'hjkhjkhsdsdiui',
  };

  return checkoutData;
};

/**
 * Get the updated items in the below format required for mutation input.
 *
 * [
 * { "key": "33e75ff09dd601bbe6dd51039152189", "quantity": 1 },
 * { "key": "02e74f10e0327ad868d38f2b4fdd6f0", "quantity": 1 },
 * ]
 *
 * Creates an array in above format with the newQty (updated Qty ).
 *
 */
export const getUpdatedItems = (products, newQty, cartKey) => {
  // Create an empty array.
  const updatedItems = [];

  // Loop through the product array.
  products.map((cartItem) => {
    // If you find the cart key of the product user is trying to update, push the key and new qty.
    if (cartItem.cartKey === cartKey) {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: parseInt(newQty),
      });

      // Otherwise just push the existing qty without updating.
    } else {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: cartItem.qty,
      });
    }
  });

  // Return the updatedItems array with new Qtys.
  return updatedItems;
};

export const formatPrice = (
  number,
  floatingDigits = 0,
  splitBy = 3,
  splitter = ' ',
  floatingSplitter = '.',
) => {
  const re = `\\d(?=(\\d{${splitBy}})+${floatingDigits > 0 ? '\\D' : '$'})`;
  const num = (typeof number === 'number' ? number : parseInt(number)).toFixed(
    Math.max(0, ~~floatingDigits),
  );

  return (floatingSplitter ? num.replace('.', floatingSplitter) : num).replace(
    new RegExp(re, 'g'),
    `$&${splitter}`,
  );
};

export const formatMeta = (metaData) =>
  metaData.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});

export const reformatPrice = (price) => price.split('UZS')[0].split(',').join('');

const parseWooPrice = (wooProduct) => {
  let price;
  let salePrice;
  let regularPrice;

  if (wooProduct.price == null) {
    return {
      price: 0,
      salePrice: null,
      regularPrice: null,
    };
  }

  if (wooProduct.price.includes(' - ')) {
    const [_price, _regularPrice] = wooProduct.price.split(' - ');

    price = parseInt(reformatPrice(_price));
    salePrice = parseInt(reformatPrice(_price));
    regularPrice = parseInt(reformatPrice(_regularPrice));
  } else {
    price = parseInt(reformatPrice(wooProduct.price));
    salePrice = parseInt(reformatPrice(wooProduct.price));
    regularPrice = parseInt(reformatPrice(wooProduct.regularPrice));
  }

  return {
    price: isNaN(price) ? 0 : price,
    salePrice: isNaN(salePrice) ? null : salePrice,
    regularPrice: isNaN(regularPrice) ? null : regularPrice,
  };
};

const formatVariation = (wooVariation) => {
  const { price, salePrice, regularPrice } = parseWooPrice(wooVariation);

  const meta = formatMeta(wooVariation.metaData);

  const tempStores = [];
  let stockStores = meta._billz_wp_sync_offices ? JSON.parse(meta._billz_wp_sync_offices) : null;

  if (stockStores) {
    for (const store of stockStores) {
      if (tempStores.find((x) => x.officeID === store.officeID) == null) {
        const hasStore = tempStores.find((x) => x.officeID === 867);
        const hasHelen = tempStores.find((x) => x.officeID === 1889);

        if ((!hasStore && store.officeID !== 1889) || (!hasHelen && store.officeID !== 867)) {
          tempStores.push(store);
        }
      }
    }
  }

  return {
    id: wooVariation.variationId,
    sku: wooVariation.sku,
    name: wooVariation.name,
    price,
    salePrice,
    regularPrice,
    image: [wooVariation.image],
    stockStores: stockStores ? tempStores : null,
    attributes:
      wooVariation.attributes && wooVariation.attributes.nodes ? wooVariation.attributes.nodes : [],
  };
};

export const formatProduct = (wooProduct) => {
  const { price, salePrice, regularPrice } = parseWooPrice(wooProduct);

  const images =
    wooProduct.galleryImages && wooProduct.galleryImages.nodes
      ? [
          wooProduct.image.sourceUrl,
          ...wooProduct.galleryImages.nodes.map(({ sourceUrl }) => sourceUrl),
        ]
      : [wooProduct.image.sourceUrl];

  const discount =
    wooProduct.onSale && salePrice && regularPrice
      ? Math.round(((regularPrice - salePrice) * 100) / regularPrice)
      : 0;

  const attributes =
    wooProduct.attributes && wooProduct.attributes.nodes
      ? wooProduct.attributes.nodes
          .filter(({ options }) => options)
          .map(({ name, options }) => ({
            name,
            options: options.map((x) =>
              attributesMap[name] ? findNameFromSlug(attributesMap[name].slug, x) : x,
            ),
          }))
      : [];

  const variations =
    wooProduct.variations && wooProduct.variations.nodes
      ? wooProduct.variations.nodes.map(formatVariation)
      : [];

  const categories =
    wooProduct.productCategories && wooProduct.productCategories.nodes
      ? wooProduct.productCategories.nodes
      : [];

  const relatedProducts =
    wooProduct.related && wooProduct.related.nodes
      ? wooProduct.related.nodes.map(formatProduct)
      : [];

  const meta = formatMeta(wooProduct.metaData);

  const tempStores = [];
  let stockStores = meta._billz_wp_sync_offices ? JSON.parse(meta._billz_wp_sync_offices) : null;

  if (stockStores && stockStores != null && typeof stockStores[Symbol.iterator] === 'function') {
    for (const store of stockStores) {
      if (tempStores.find((x) => x.officeID === store.officeID) == null) {
        const hasStore = tempStores.find((x) => x.officeID === 867);
        const hasHelen = tempStores.find((x) => x.officeID === 1889);

        if ((!hasStore && store.officeID !== 1889) || (!hasHelen && store.officeID !== 867)) {
          tempStores.push(store);
        }
      }
    }
  }

  return {
    discount,
    attributes,
    variations,
    relatedProducts,
    image: images,
    category: categories,
    id: wooProduct.productId || wooProduct.variationId || wooProduct.id,
    sku: wooProduct.sku,
    name: wooProduct.name,
    price: price,
    salePrice: salePrice,
    regularPrice: regularPrice,
    slug: wooProduct.slug || null,
    rating: wooProduct.avarageRating ? wooProduct.avarageRating : 0,
    offerEnd: 'Test',
    new: false,
    stock: 3,
    tag: [],
    shortDescription: wooProduct.description || null,
    fullDescription: wooProduct.description || null,
    topVariations: [],
    type: wooProduct.type || null,
    stockStores: stockStores ? tempStores : null,
  };
};

export const addZero = (number) => (String(number).length === 1 ? `0${number}` : number);

export const formatDateTime = (date, template = '{day}.{month}.{year} {hours}:{minutes}') => {
  const dateString = (date ? new Date(date) : new Date()).toLocaleString('en-US', {
    hour12: false,
  });

  const [_date, _time] = dateString.split(', ');
  const [month, day, year] = _date.split('/');
  const [hours, minutes, seconds] = _time.split(':');

  return format(template, {
    year,
    day: addZero(day),
    month: addZero(month),
    hours: addZero(hours),
    minutes: addZero(minutes),
    seconds: addZero(seconds),
  });
};

export const formatPost = (wooPost) => {
  return {
    ...wooPost,
    date: formatDateTime(wooPost.date, '{day}.{month}.{year}'),
    rawDate: formatDateTime(wooPost.date, '{year}-{month}-{day}'),
    content: wooPost.content.replace(/^\n|\n$/g, ''),
    short: `${striptags(wooPost.content.replace(/^\n|\n$/g, '').slice(0, 155))}...`,
  };
};

export const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

export const findNameFromSlug = (key, slug) => {
  const staticData = new StaticDataSingleton().getInstance();

  if (staticData.attributes.attributeTranslations[key] == null) {
    return slug;
  }

  const option = staticData.attributes.attributeTranslations[key].find(
    (option) => option.slug === slug,
  );

  if (option) {
    return option.name;
  }

  return slug;
};

export const attributesMap = {
  pa_color: {
    name: 'Цвет',
    slug: 'paColors',
  },
  pa_size: {
    name: 'Размер',
    slug: 'paSizes',
  },
  pa_collection: {
    name: 'Коллеция',
    slug: 'paCollections',
  },
  pa_material: {
    name: 'Материал',
    slug: 'paMaterials',
  },
  pa_lining: {
    name: 'Материал подкладки',
    slug: 'paLinings',
  },
  pa_crankshaft: {
    name: 'Обхват голенища',
    slug: 'paCrankshafts',
  },
  pa_decor: {
    name: 'Декор',
    slug: 'paDecors',
  },
  'pa_health-view': {
    name: 'Вид пяточной части',
    slug: 'paHealthViews',
  },
  'pa_heel-height': {
    name: 'Высота каблука',
    slug: 'paHeelHeights',
  },
  'pa_outsole-thickness': {
    name: 'Толщина подошвы',
    slug: 'paOutsoleThickness',
  },
  'pa_platform-height': {
    name: 'Высота платформы',
    slug: 'paPlatformHeights',
  },
  'pa_shin-height': {
    name: 'Высота голенища',
    slug: 'paShinHeights',
  },
  'pa_top-color-optional': {
    name: 'Цвет верха дополнительный',
    slug: 'paTopColorOptionals',
  },
  'pa_type-of-fastener': {
    name: 'Вид застежки',
    slug: 'paTypeOfFasteners',
  },
  'pa_view-of-heel': {
    name: 'Вид каблука',
    slug: 'paViewOfHeels',
  },
  'pa_view-of-the-socket': {
    name: 'Вид носочной части',
    slug: 'paViewOfTheSockets',
  },
};

const colors = {
  bezhevyj: '',
  belyj: '',
  bordovyj: '',
  bronzovyj: '',
  galuboj: '',
  goluboj: '',
  grafitovyj: '',
  zheltyj: '',
  zelenyj: '',
  zolotoj: '',
  karallovyj: '',
  korichnevyj: '',
  krasnyj: '',
  mokko: '',
  molochnyj: '',
  multikolor: '',
  nejtralnyj: '',
  pesochnyj: '',
  pudrovyj: '',
  rozovyj: '',
  ryzhij: '',
  serebryanyj: '',
  seryj: '',
  sinij: '',
  sirenevyj: '',
  fioletovyj: '',
  fuksiya: '',
  chernyj: '',
};
