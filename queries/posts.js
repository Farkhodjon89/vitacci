import gql from 'graphql-tag';

import { ProductCategoriesFragment } from '../fragments/categories';

export const DATA_FOR_POSTS = gql`
  query PostsAndCategories {
    posts {
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
  }
`;

export const POSTS = gql`
  query Posts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
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
  }
`;

export const POST_BY_ID = gql`
  query PostAndCategories($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
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
`;
