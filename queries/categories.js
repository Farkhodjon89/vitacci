import gql from 'graphql-tag';

import { ProductCategoriesFragment } from '../fragments/categories';

const GET_CATEGORIES_QUERY = gql`
  query {
    productCategories(first: 50) {
      nodes {
        ...ProductCategories
      }
    }
  }
  ${ProductCategoriesFragment}
`;

export default GET_CATEGORIES_QUERY;
