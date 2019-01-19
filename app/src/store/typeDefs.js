import gql from 'graphql-tag'

export default gql`
  type Mutation {
    setAuth(token: ID!, user: user!): Boolean!
    resetAuth: Boolean!
  }

  input user {
    email: String
    picture: String
  }
`
