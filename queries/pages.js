import gql from 'graphql-tag'

const PAGE_BY_ID = gql`
  query Page($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      content
    }
  }
`

export default PAGE_BY_ID
