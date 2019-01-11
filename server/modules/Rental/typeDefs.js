import { gql } from 'apollo-server'

export default gql`
  directive @user on FIELD_DEFINITION
  scalar Date
  # TODO:Not Finished
  extend type Mutation {
    makeRental(inventoryID: ID!, returnDate: Date!): Rental @user
  }

  type Rental {
    id: ID!
    rentalDate: Date!
    returnDate: Date!
    inventory: Inventory
    user: User
  }
`
