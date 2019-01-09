import { mergeSchemas } from 'apollo-server'
import schemaDirectives from '../directives'
import { UserSchema, User } from './user'

export const schema = mergeSchemas({
  schemas: [UserSchema],
  schemaDirectives
})

export const models = {
  User
}
