import { makeExecutableSchema } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
export { default as Movie } from './model'

export const MovieSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
