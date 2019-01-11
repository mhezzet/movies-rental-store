import { gql } from 'apollo-server'

export default gql`
  directive @user on FIELD_DEFINITION
  scalar Date

  type Mutation {
    makeRental(inventoryID: ID!, returnDate: Date!): Rental @user
  }
  type Query {
    dummy2: String
  }

  type Rental {
    id: ID!
    rentalDate: Date!
    returnDate: Date!
  }
`
