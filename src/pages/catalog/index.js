import React, { useEffect, useState } from 'react'

import ShopGridStandard from '../../components/catalog'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'
import { catalog } from '../../utils/catalog'
import { StaticDataSingleton } from '../../utils/getStaticData'

const Catalog = ({ products, pageInfo, attributes }) => {
  const [urlFilters, setUrlFilters] = useState({})

  if (process.browser) {
    useEffect(() => {
      const { filters } = catalog.init()

      if (Object.keys(filters).length) {
        setUrlFilters(filters)
      }
    }, [window.location.search])
  }

  return (
    <BreadcrumbsProvider>
      <ShopGridStandard
        key={'catalog'}
        attributes={attributes}
        urlFilters={urlFilters}
        products={products}
        pageInfo={pageInfo}
      />
    </BreadcrumbsProvider>
  )
}

export const getStaticProps = async () => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch()

  // const result = await client.query({
  //   query: PRODUCTS_FOR_CATALOG,
  //   fetchPolicy: 'no-cache',
  //   variables: {
  //     first: 12,
  //   },
  // });
  //
  // const products = result.data.products.nodes.map(formatProduct);
  // const pageInfo = result.data.products.pageInfo;

  return {
    props: {
      attributes: {
        categories: staticData.categories,
        ...staticData.attributes.catalogAttributes,
      },
      products: [],
      pageInfo: {},
    },
    revalidate: 600,
  }
}

export default Catalog
