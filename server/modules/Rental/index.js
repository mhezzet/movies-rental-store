import { makeExecutableSchema } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
export { default as Rental } from './model'

export const RentalSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
