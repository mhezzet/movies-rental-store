import { makeExecutableSchema } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
export { default as Inventory } from './model'

export const InventorySchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
