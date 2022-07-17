// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        product =>
          product.category.filter(single => single.name === category)[0]
      )
    : products;

  if (type && type === 'new') {
    const newProducts = finalProducts.filter(single => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === 'bestSeller') {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === 'saleItems') {
    const saleItems = finalProducts.filter(
      single => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQty = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    single =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        single =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter(single => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === 'category') {
      return products.filter(product =>
        sortValue.some(x => product.category.map(y => y.name).includes(x))
      );
    }

    if (sortType === 'tag') {
      return products.filter(
        product => product.tag.filter(single => sortValue.includes(single))[0]
      );
    }
    if (sortType === 'color') {
      return products.filter(product => {
        const colorAttribute = product.attributes.find(
          attribute => attribute.name.toLowerCase() === 'color'
        );

        return (
          colorAttribute &&
          sortValue.some(x => colorAttribute.options.includes(x))
        );
      });
    }
    if (sortType === 'size') {
      return products.filter(product => {
        const sizeAttribute = product.attributes.find(
          attribute => attribute.name.toLowerCase() === 'size'
        );

        return (
          sizeAttribute &&
          sortValue
            .map(x => String(x).replace('.', ','))
            .some(x => sizeAttribute.options.includes(x))
        );
      });
    }
    if (sortType === 'price') {
      const [minPrice, maxPrice] = sortValue;

      return products.filter(
        product => product.price >= minPrice && product.price <= maxPrice
      );
    }
    if (sortType === 'filterSort') {
      let sortProducts = [...products];

      if (sortValue === 'priceHighToLow') {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === 'priceLowToHigh') {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }

  return products;
};

// get unique element
export const getUniqueElemArray = array =>
  array.filter((v, i, self) => i === self.indexOf(v));

// get unique categories
export const getUniqueCategories = products => {
  let productCategories = [];
  products &&
    products.map(product => {
      return (
        product.category &&
        product.category.map(single => {
          return productCategories.push(single.name);
        })
      );
    });
  return getUniqueElemArray(productCategories);
};

// get unique tags
export const getUniqueTags = products => {
  let productTags = [];
  products &&
    products.map(product => {
      return (
        product.tag &&
        product.tag.map(single => {
          return productTags.push(single);
        })
      );
    });
  const uniqueProductTags = getUniqueElemArray(productTags);
  return uniqueProductTags;
};

// get unique colors
export const getUniqueColors = products => {
  let productColors = [];

  for (const product of products || []) {
    for (const attribute of product.attributes) {
      if (attribute.name.toLowerCase() === 'color') {
        productColors.push(...attribute.options);
      }
    }
  }

  return getUniqueElemArray(productColors);
};

// get unique sizes
export const getProductsUniqueSizes = products => {
  let productSizes = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return single.size.map(single => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const uniqueProductSizes = getUniqueElemArray(productSizes);
  return uniqueProductSizes;
};

// get product unique sizes
export const getUniqueSizes = product => {
  let productSizes = [];
  product.variation &&
    product.variation.map(singleVariation => {
      return (
        singleVariation.size &&
        singleVariation.size.map(singleSize => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const uniqueProductSizes = getUniqueElemArray(productSizes);
  return uniqueProductSizes;
};

export const setActiveSort = (e, currentList) => {
  const filterButtons = document.querySelectorAll(
    '.categories-check button, .sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button'
  );

  e.currentTarget.classList.add('active');

  filterButtons.forEach(elem => {
    if (!currentList.includes(elem.outerText)) {
      elem.classList.remove('active');
    }
  });
};

export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll('.shop-tab button');
  gridSwitchBtn.forEach(elem => {
    elem.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    '#product-filter-wrapper'
  );
  shopTopFilterWrapper.classList.toggle('active');
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + 'px';
  }
  e.currentTarget.classList.toggle('active');
};
