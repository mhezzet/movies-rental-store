import { gql } from 'apollo-server'

export default gql`
  directive @user on FIELD_DEFINITION
  directive @admin on FIELD_DEFINITION

  type Mutation {
    registerLocal(email: String!, password: String!): AuthResolver
    registerFaceBook(authToken: String!): AuthResolver
    registerGoogle(authToken: String!): AuthResolver
    updateProfile(data: updateProfileInput): User
  }

  type Query {
    me: User @user
    loginLocal(email: String!, password: String!): AuthResolver
  }

  type AuthResolver {
    user: User
    token: String
  }

  type User {
    id: ID!
    email: String
    picture: String!
    firstName: String
    lastName: String
    address: [Address]
  }

  type Address {
    id: ID!
    city: String
    country: String
    address: String
    address2: String
    district: String
    postalCode: String
    phone: String
  }

  input updateProfileInput {
    picture: String!
    firstName: String
    lastName: String
    address: [address]
  }

  input address {
    city: String
    country: String
    address: String
    address2: String
    district: String
    postalCode: String
    phone: String
  }
`
