import { UserInputError, AuthenticationError } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

async function makeRental(
  _,
  args,
  { models: { Rental, Inventory }, user: { id } }
) {
  const inventory = await Inventory.findOne({ _id: args.inventoryID })
  if (!inventory) throw new UserInputError('no such an inventory')

  let rental = await Rental.create({
    inventory: args.inventoryID,
    user: id,
    returnDate: args.returnDate
  })

  rental = await Rental.findOne({ _id: rental._id }).populate({
    path: 'inventory user',
    populate: { path: 'movies' }
  })

  return rental
}

export default {
  Mutation: {
    makeRental
  },
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
}
