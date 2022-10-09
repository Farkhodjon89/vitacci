import gql from 'graphql-tag'

const GET_CATEGORIES_QUERY = gql`
  query MyQuery {
    productCategories(where: { hideEmpty: true }, first: 100) {
      nodes {
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
        children(first: 100, where: { hideEmpty: true }) {
          nodes {
            databaseId
            name
            slug
          }
        }
      }
    }
  }
`

export default GET_CATEGORIES_QUERY
