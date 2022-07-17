import React, { useEffect, useState } from 'react'

import ShopGridStandard from '../../components/catalog'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'
import { catalog } from '../../utils/catalog'
import { StaticDataSingleton } from '../../utils/getStaticData'

const CatalogSlug = ({ products, pageInfo, attributes, currentCategory }) => {
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
        key={currentCategory.slug}
        urlFilters={{ ...urlFilters, category: currentCategory.slug }}
        currentCategory={currentCategory}
        attributes={attributes}
        products={products}
        pageInfo={pageInfo}
      />
    </BreadcrumbsProvider>
  )
}

// export const getStaticPaths = async () => {
//   const staticData = new StaticDataSingleton().getInstance()
//   await new StaticDataSingleton().checkAndFetch()

//   const paths = staticData.categories.list.map((category) => ({
//     params: {
//       slug: category.slug,
//     },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

export const getServerSideProps = async ({ params }) => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch()

  const currentCategory = staticData.categories.list.find(
    (category) => category.slug === params.slug
  )

  return {
    props: {
      attributes: {
        categories: staticData.categories,
        ...staticData.attributes.catalogAttributes,
      },
      currentCategory: currentCategory,
      products: [],
      pageInfo: {},
    },
    // revalidate: 600,
  }
}

export default CatalogSlug
