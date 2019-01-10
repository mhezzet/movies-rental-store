import { gql } from 'apollo-server'

export default gql`
  type Rental {
    id: ID!
    rentalDate: String!
    returnDate: String!
  }
`
