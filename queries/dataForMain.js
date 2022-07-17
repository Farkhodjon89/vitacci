import gql from 'graphql-tag';

import { ProductCategoriesFragment } from '../fragments/categories';
import {
  _Product,
  _SimpleProduct,
  _VariableProduct,
} from '../fragments/products';

export const DATA_FOR_MAIN = gql`
  query {
    posts(first: 3) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        databaseId
        date
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }

    saleProducts: products(
      first: 4,
      where: {
        status: "publish",
        stockStatus: IN_STOCK,
        onSale: true,
        taxonomyFilter: {and: {taxonomy: PASEASON, terms: ["SS2021", "SS2020"]}}}) {
      nodes {
        ..._Product
        status
        description
        averageRating
        type
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

    products: products(
      first: 4
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        categoryIn: ["botinki"]
      }
    ) {
      nodes {
        ..._Product
        status
        description
        averageRating
        type
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
