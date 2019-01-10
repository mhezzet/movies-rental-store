import { gql } from 'apollo-server'

export default gql`
  type Movie {
    id: ID!
    title: String
    description: String
    releaseYear: Int
    numberInStock: Int
    rating: Int
  }
`
