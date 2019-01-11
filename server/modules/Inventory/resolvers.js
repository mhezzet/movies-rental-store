import { UserInputError } from 'apollo-server'

async function newInventory(_, { movies }, { models: { Inventory, Movie } }) {
  movies.forEach(async id => {
    const movie = await Movie.findOne({ _id: id })
    if (!movie) throw new UserInputError(`no such a movie "${id}"`)
  })

  let inventory = await Inventory.create({ movies })
  inventory = await Inventory.findOne({ _id: inventory._id }).populate('movies')

  return inventory
}

export default {
  Mutation: {
    newInventory
  },
  Query: {
    dummy: () => 'dummy'
  }
}
