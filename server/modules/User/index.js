import { makeExecutableSchema } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
export { default as User } from './model'

export const UserSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
