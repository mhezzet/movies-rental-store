import { Schema, model } from 'mongoose'

const rentalSchema = new Schema(
  {
    inventory: {
      type: Schema.Types.ObjectId,
      ref: 'inventory'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    rentalDate: {
      type: String,
      maxlength: 50
    },
    returnDate: {
      type: String,
      maxlength: 50
    }
  },
  {
    timestamps: true
  }
)

export default model('rental', rentalSchema)
