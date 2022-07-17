import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { HeadData } from '../../components/Head';
import { BreadcrumbsItem, BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import Layout from '../../components/Layout';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import RelatedProductSlider from '../../wrappers/product/RelatedProductSlider';
import ProductImageDescription from '../../wrappers/product/ProductImageDescription';
import { formatMeta, formatPrice, formatProduct } from '../../utils/functions';
import client from '../../components/ApolloClient';
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_BY_TOP_VARIATION_QUERY } from '../../../queries/products';
import NotFoundComponent from '../../components/NotFound';
import { StaticDataSingleton } from '../../utils/getStaticData';

const ProductView = ({ product, categories, stockStatus }) => {
  const [currentProduct, setCurrentProduct] = useState(product);
  const [currentVariation, setCurrentVariation] = useState(product.variations[0]);

  const [selectedColor, setSelectedColorForTitle] = useState(null);

  useEffect(() => {
    setCurrentProduct(product);
    setCurrentVariation(product.variations[0]);
  }, [product]);

  function setVariation(variationData) {
    for (const variation of product.variations) {
      if (variation.id === variationData.id) {
        setCurrentVariation(variation);
        break;
      }
    }
  }

  function setProduct(productData) {
    for (const variation of product.topVariations) {
      if (variation.id === productData.id) {
        setCurrentProduct({
          ...variation,
          topVariations: product.topVariations,
        });
        break;
      }
    }
  }

  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData
          pageUrl="/product/"
          pageData={{
            productTitle: product.name,
            sku: product.sku,
            color: selectedColor,
            price: formatPrice(currentVariation ? currentVariation.price : currentProduct.price),
          }}
          product={product}
        />

        <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
        <BreadcrumbsItem to={'/catalog'}>Каталог</BreadcrumbsItem>
        <BreadcrumbsItem to={`/product/${product.slug}`}>{product.name}</BreadcrumbsItem>

        <Layout headerTop="visible" categories={categories}>
          {/* breadcrumb */}
          <Breadcrumb />

          {/* product description with image */}
          <ProductImageDescription
            spaceTopClass="pt-10"
            spaceBottomClass="pb-100"
            product={currentProduct}
            variation={currentVariation}
            galleryType="leftThumb"
            setProduct={setProduct}
            setVariation={setVariation}
            setSelectedColorForTitle={setSelectedColorForTitle}
          />

          {/* product description tab */}
          {/*<ProductDescriptionTab*/}
          {/*  spaceBottomClass="pb-90"*/}
          {/*  productFullDesc={product.fullDescription}*/}
          {/*/>*/}

          {/* related product slider */}
          <RelatedProductSlider spaceBottomClass="pb-95" products={product.relatedProducts} />
        </Layout>
      </Fragment>
    </BreadcrumbsProvider>
  );
};

const ProductTabLeft = ({ product, categories, notFound }) => {
  if (notFound) {
    return (
      <BreadcrumbsProvider>
        <NotFoundComponent />
      </BreadcrumbsProvider>
    );
  }

  return <ProductView key={product.slug} product={product} categories={categories} />;
};

// export const getStaticPaths = async () => {
//   const paths = [];
//
//   const fetchProducts = async after => {
//     const _tempProductsResult = await client.query({
//       query: PRODUCTS_FOR_CATALOG,
//       variables: {
//         first: 100,
//         ...(after ? { after } : {}),
//       },
//     });
//
//     paths.push(
//       ..._tempProductsResult.data.products.nodes.map(product => ({
//         params: { slug: product.slug },
//       }))
//     );
//
//     if (_tempProductsResult.data.products.pageInfo.hasNextPage) {
//       await fetchProducts(_tempProductsResult.data.products.pageInfo.endCursor);
//     }
//   };
//
//   await fetchProducts();
//
//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ params }) => {
  const staticData = new StaticDataSingleton().getInstance();
  await new StaticDataSingleton().checkAndFetch();

  let result;

  try {
    result = await client.query({
      query: PRODUCT_BY_SLUG_QUERY,
      fetchPolicy: 'no-cache',
      variables: { id: params.slug },
    });
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  const product = formatProduct(result.data.product);

  const metas = formatMeta(result.data.product.metaData);

  if (metas._top_variation) {
    const topVariations = await client.query({
      query: PRODUCT_BY_TOP_VARIATION_QUERY,
      fetchPolicy: 'no-cache',
      variables: { topVariation: metas._top_variation },
    });

    product.topVariations = topVariations.data.products.nodes.map(formatProduct);
  }

  return {
    props: {
      product,
      stockStatus: metas._billz_shop_stock ? JSON.parse(metas._billz_shop_stock) : null,
      categories: staticData.categories.main,
      notFound: false,
    },
  };
};

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

export default ProductTabLeft;
