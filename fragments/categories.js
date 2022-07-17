import gql from 'graphql-tag';

export const ProductCategoriesFragment = gql`
  fragment ProductCategories on ProductCategory {
    databaseId
    name
    slug
    parent {
      node {
        slug
        parent {
          node {
            slug
          }
        }
      }
    }
    children(first: 50) {
      nodes {
        databaseId
        name
        slug
      }
    }
  }
`;
