import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    newInventory(movies: [ID!]!): Inventory
  }

  type Query {
    dummy: String
  }

  type Inventory {
    id: ID!
  }
`
