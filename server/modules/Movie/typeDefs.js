import { gql } from 'apollo-server'

export default gql`
  directive @admin on FIELD_DEFINITION

  type Mutation {
    addMovie(movie: movieInput!): Movie @admin
    updateMovie(movieID: ID!, movie: movieInput!): Movie @admin
    deleteMovie(movieID: ID!): Movie @admin
  }

  type Query {
    movie(movieID: ID!): Movie
    movies: [Movie!]!
  }

  input movieInput {
    title: String!
    description: String
    releaseYear: Int
    numberInStock: Int
    rating: Int
    poster: String
    genre: [AllowedGenre]
  }

  type Movie {
    id: ID
    title: String
    description: String
    releaseYear: Int
    numberInStock: Int
    rating: Int
    genre: [AllowedGenre]
  }

  enum AllowedGenre {
    action
    comedy
    drama
  }
`
