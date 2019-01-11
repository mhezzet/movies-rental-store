import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

async function makeRental(
  _,
  args,
  { models: { Rental, Inventory, User, Movie }, user: { id } }
) {
  const inventory = await Inventory.findOne({ _id: args.inventoryID })
  if (!inventory) throw new UserInputError('no such an inventory')

  const movies = await Movie.updateMany(
    {
      $and: [{ _id: { $in: inventory.movies } }, { numberInStock: { $gt: 0 } }]
    },
    { $inc: { numberInStock: -1 } }
  )

  if (!movies.nModified) throw new ApolloError('internal server error')

  let rental = await Rental.create({
    inventory: args.inventoryID,
    user: id,
    returnDate: args.returnDate
  })

  await User.findOneAndUpdate({ _id: id }, { $push: { rentals: rental._id } })

  await Rental.populate(rental, {
    path: 'inventory user',
    populate: { path: 'movies rentals' }
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
