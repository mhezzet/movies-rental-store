import { mergeSchemas, gql } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import schemaDirectives from '../directives'
import { UserSchema, User } from './user'
import { RentalSchema, Rental } from './Rental'
import { InventorySchema, Inventory } from './Inventory'
import { MovieSchema, Movie } from './Movie'

const linkTypeDefs = gql`
  extend type User {
    rentals: [Rental!]!
  }

  extend type Rental {
    inventory: Inventory
    user: User
  }

  extend type Inventory {
    movies: [Movie]
  }
`

export const schema = mergeSchemas({
  schemas: [
    RentalSchema,
    UserSchema,
    MovieSchema,
    InventorySchema,
    linkTypeDefs
  ],
  resolvers: {
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'Date custom scalar type',
      parseValue(value) {
        return new Date(value) // value from the client
      },
      serialize(value) {
        return value.getTime() // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return new Date(Number(ast.value)) // ast value is always in string format
        }
        return null
      }
    })
  },
  schemaDirectives
})

export const models = {
  User,
  Rental,
  Inventory,
  Movie
}
