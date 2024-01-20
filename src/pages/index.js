import React, { Fragment } from 'react'
import client from '../components/ApolloClient'
import HomeProductsGrid from '../wrappers/product/HomeProductsGrid'
import MainSlider from '../wrappers/hero-slider/MainSlider'
import AdsBanner from '../wrappers/ads-banner'
import FeatureIcon from '../wrappers/feature-icon/FeatureIcon'
import Layout from '../components/Layout'
import { formatPost, formatProduct } from '../utils/functions'
import { DATA_FOR_MAIN } from '../../queries/dataForMain'
import BlogFeatured from '../wrappers/blog-featured/BlogFeatured'
import Link from 'next/link'
import useWindowDimensions from '../components/useWindowDimensions'
import NoSsr from '../components/NoSsr'
import { HeadData } from '../components/Head'
import { StaticDataSingleton } from '../utils/getStaticData'
import { PRODUCTS_FOR_CATALOG } from '../../queries/dataForCatalog'

const Home = ({ products, saleProducts, categories, posts }) => {
  const { width } = useWindowDimensions()

  const newArrivals = [
    {
      url: '/catalog',
      image: `${process.env.PUBLIC_URL}/banners/discounts.jpg`,
      title: 'АКЦИИ',
    },
    {
      url: '/catalog/obuv-zhenskij',
      image: `${process.env.PUBLIC_URL}/banners/sandals.jpg`,
      title: 'БОСОНОЖКИ',
    },
    {
      url: '/catalog/obuv-zhenskij',
      image: `${process.env.PUBLIC_URL}/banners/shoes.JPEG`,
      title: 'ТУФЛИ',
    },
    {
      url: '/catalog/sumki-zhenskij',
      image: `${process.env.PUBLIC_URL}/banners/bags.jpg`,
      title: 'СУМКИ',
    },
  ]

  return (
    <Fragment>
      <HeadData />

      <Layout
        headerPaddingClass='header-padding-1'
        headerTop='visible'
        categories={categories}
      >
        <MainSlider />

        <FeatureIcon
          className='mt-5'
          spaceBottomClass='pb-1 pt-70'
          containerClass='container'
          responsiveClass='res-mrg-md-mt'
        />

        <div className='container pb-60'>
          <div className='row'>
            {newArrivals.map((item, i) => (
              <div key={i} className='mb-3 mb-md-0 col-6 col-md-3 '>
                <div className='new-arrivals'>
                  <img
                    className='w-100'
                    style={{ height: '100%' }}
                    src={item.image}
                    alt=''
                  />

                  <div className='url-button'>
                    <Link href={item.url}>
                      <a className='animated def-button'>{item.title}</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdsBanner />

        <NoSsr>
          <div className='container pb-60'>
            <div className='row'>
              <div className='col-12'>
                <Link href='/installment'>
                  <a>
                    <img
                      className='w-100'
                      src={`${process.env.PUBLIC_URL}/banners/long_banner${
                        width && width <= 576 ? '_mobile' : ''
                      }.jpg`}
                      alt='installment'
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </NoSsr>

        <HomeProductsGrid
          spaceBottomClass='pb-60'
          sectionTitle={'Товары со скидкой'}
          products={saleProducts}
        />

        {/* <HomeProductsGrid
          spaceBottomClass='pb-60'
          sectionTitle={'Хиты продаж'}
          products={products}
        /> */}

        {posts ? <BlogFeatured spaceBottomClass='pb-30' posts={posts} /> : null}
      </Layout>
    </Fragment>
  )
}

export default Home

export const getStaticProps = async () => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch(true)

  const result = await client.query({
    query: DATA_FOR_MAIN,
    fetchPolicy: 'no-cache',
  })

  const products = result.data.products.nodes.map(formatProduct)
  const saleProducts = [...result.data.saleProducts.nodes.map(formatProduct)]
  const posts = result.data.posts.nodes.map((post) => formatPost(post, true))

  return {
    props: {
      categories: staticData.categories.main,
      saleProducts,
      products,
      posts,
    },
    revalidate: 600,
  }
}
