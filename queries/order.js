import gql from 'graphql-tag'

export const ORDER_DATA = gql`
  query Order($id: ID!) {
    order(id: $id, idType: DATABASE_ID) {
      date
      total
      status
      paymentMethodTitle
      orderId
      lineItems {
        nodes {
          product {
            name
          }
          quantity
          total
        }
      }
    }
  }
`
