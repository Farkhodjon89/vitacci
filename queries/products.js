import gql from 'graphql-tag';

import { ProductCategoriesFragment } from '../fragments/categories';
import {
  _Product,
  _SimpleProduct,
  _VariableProduct,
} from '../fragments/products';

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($id: ID!) {
    product(id: $id, idType: SLUG) {
      ..._Product
      status
      description
      averageRating
      type
      onSale
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
      related(first: 10, where: { status: "publish", stockStatus: IN_STOCK }) {
        nodes {
          ..._Product
          ... on SimpleProduct {
            ..._SimpleProduct
          }
          ... on VariableProduct {
            ..._VariableProduct
          }
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
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`;

export const PRODUCT_BY_TOP_VARIATION_QUERY = gql`
  query ProductsByTopVariation($topVariation: [String]) {
    products(
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        taxonomyFilter: {
          and: { taxonomy: PATOPVARIATION, terms: $topVariation }
        }
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
          related(first: 10) {
            nodes {
              ..._Product
              ... on SimpleProduct {
                ..._SimpleProduct
              }
              ... on VariableProduct {
                ..._VariableProduct
              }
            }
          }
        }
        ... on VariableProduct {
          ..._VariableProduct
          related(first: 10) {
            nodes {
              ..._Product
              ... on SimpleProduct {
                ..._SimpleProduct
              }
              ... on VariableProduct {
                ..._VariableProduct
              }
            }
          }
        }
      }
    }
  }
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`;

export const SEARCH_PRODUCTS = gql`
  query ProductsForCatalog($first: Int, $search: String) {
    products(
      first: $first
      where: { status: "publish", stockStatus: IN_STOCK, search: $search }
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
