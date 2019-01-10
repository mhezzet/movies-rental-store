import { mergeSchemas, gql } from 'apollo-server'
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
    movies: [Movie!]!
  }
`

export const schema = mergeSchemas({
  schemas: [
    RentalSchema,
    UserSchema,
    InventorySchema,
    MovieSchema,
    linkTypeDefs
  ],
  schemaDirectives
})

export const models = {
  User,
  Rental,
  Inventory,
  Movie
}
