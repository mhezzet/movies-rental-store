import { UserInputError, AuthenticationError } from 'apollo-server'

/**
|--------------------------------------------------
| Register Local
|--------------------------------------------------
*/
async function registerLocal(_, args, { models: { User } }) {
  const user = await User.create({
    method: 'local',
    roles: ['user'],
    ...args
  })

  const token = user.genToken()
  return { user, token }
}

/**
|--------------------------------------------------
| Login Local
|--------------------------------------------------
*/
async function loginLocal(_, args, { models: { User } }) {
  const user = await User.findOne({ email: args.email })
  if (!user) throw new UserInputError('invalid email or password')

  const validPassword = await user.validPassword(args.password)
  if (!validPassword) throw new UserInputError('invalid email or password')

  const token = user.genToken()
  return { user, token }
}

/**
|--------------------------------------------------
| me
|--------------------------------------------------
*/
async function me(_, __, { models: { User }, user: { id } }) {
  const user = await User.findOne({ _id: id })
  return user
}

export default {
  Mutation: {
    registerLocal
  },
  Query: {
    loginLocal,
    me
  }
}
