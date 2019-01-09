import { UserInputError, AuthenticationError } from 'apollo-server'
import axios from 'axios'

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
| Register FaceBook
|--------------------------------------------------
*/
async function registerFaceBook(_, args, { models: { User } }) {
  let response
  try {
    response = await axios.get('https://graph.facebook.com/v3.2/me', {
      params: {
        access_token: args.authToken,
        fields: 'email, last_name,first_name, id, picture{url}'
      }
    })
  } catch {
    throw new AuthenticationError('invalid access token')
  }

  let user = await User.findOne({ facebookID: response.data.id })
  if (user) {
    const token = user.genToken()
    return { user, token }
  }

  user = await User.create({
    method: 'facebook',
    roles: ['user'],
    email: response.data.email,
    facebookID: response.data.id,
    picture: response.data.picture.data.url,
    firstName: response.data.first_name,
    lastName: response.data.last_name
  })

  const token = user.genToken()
  return { user, token }
}

/**
|--------------------------------------------------
| Register Google
|--------------------------------------------------
*/
async function registerGoogle(_, args, { models: { User } }) {
  let response
  try {
    response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${args.authToken}`
        }
      }
    )
  } catch {
    throw new AuthenticationError('invalid access token')
  }

  let user = await User.findOne({ googleID: response.data.id })
  if (user) {
    const token = user.genToken()
    return { user, token }
  }

  user = await User.create({
    method: 'google',
    roles: ['user'],
    googleID: response.data.id,
    picture: response.data.picture,
    firstName: response.data.given_name,
    lastName: response.data.family_name
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
    registerLocal,
    registerFaceBook,
    registerGoogle
  },
  Query: {
    loginLocal,
    me
  }
}
