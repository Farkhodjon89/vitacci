import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';

import MainSlider from '../../wrappers/hero-slider/MainSlider';
import HomeProductsGrid from '../../wrappers/product/HomeProductsGrid';
import Layout from '../../layouts';
import AdsBanner from '../../wrappers/ads-banner';

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Vitacci</title>
        <meta
          name="description"
          content="Electronics home of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <Layout headerPaddingClass="header-padding-1" headerTop="visible">
        <MainSlider />

        <HomeProductsGrid
          spaceTopClass="pt-80"
          spaceBottomClass="pb-60"
          category="electronics"
          sectionTitle="Хиты продаж"
        />

        <HomeProductsGrid
          spaceBottomClass="pb-60"
          category="electronics"
          sectionTitle="Товары на скидке"
        />

        <AdsBanner />
      </Layout>
    </Fragment>
  );
};

export default Home;
