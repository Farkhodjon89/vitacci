import gql from 'graphql-tag';

import {
  _Product,
  _SimpleProduct,
  _VariableProduct,
} from '../fragments/products';

export const PRODUCTS_FOR_CATALOG = gql`
  query ProductsForCatalog(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $minPrice: Float
    $maxPrice: Float
    $onSale: Boolean
    $search: String
  ) {
    products(
      first: $first
      after: $after
      where: {
        # orderby: { field: PRICE, order: DESC }
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        minPrice: $minPrice
        maxPrice: $maxPrice
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ..._Product
        description
        averageRating
        productCategories {
          nodes {
            name
            slug
          }
        }
        attributes {
          nodes {
            name
            options
          }
        }
        ... on SimpleProduct {
          ..._SimpleProduct
        }
        ... on VariableProduct {
          ..._VariableProduct
        }
      }
    }
  }
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`;
