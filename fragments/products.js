import gql from 'graphql-tag'

export const _Product = gql`
  fragment _Product on Product {
    productId
    sku
    slug
    name
    onSale
    type
    image {
      sourceUrl
    }
    galleryImages {
      nodes {
        sourceUrl
      }
    }
  }
`

export const _SimpleProduct = gql`
  fragment _SimpleProduct on SimpleProduct {
    price
    salePrice
    regularPrice
    metaData {
      key
      value
    }
  }
`

export const _VariableProduct = gql`
  fragment _VariableProduct on VariableProduct {
    price
    salePrice
    regularPrice
    metaData {
      key
      value
    }
    variations(where: { stockStatus: IN_STOCK }) {
      nodes {
        metaData {
          key
          value
        }
        variationId
        sku
        name
        price
        salePrice
        regularPrice
        image {
          sourceUrl
        }
        attributes {
          nodes {
            name
            value
          }
        }
      }
    }
  }
`
