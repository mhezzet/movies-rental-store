import { UserInputError, AuthenticationError } from 'apollo-server'

async function makeRental(
  _,
  args,
  { models: { Rental, Inventory }, user: { id } }
) {
  const inventory = await Inventory.findOne({ _id: args.inventoryID })
  if (!inventory) throw new UserInputError('no such an inventory')
  const rental = await Rental.create({
    inventory: args.inventoryID,
    user: id,
    returnDate: args.returnDate
  })

  return rental
}

export default {
  Query: {
    dummy2: () => 'dummy2'
  },
  Mutation: {
    makeRental
  }
}
