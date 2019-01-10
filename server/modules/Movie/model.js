import { Schema, model } from 'mongoose'

const movieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 50
    },
    description: {
      type: String,
      maxlength: 300
    },
    releaseYear: {
      type: Number,
      maxlength: 4
    },
    numberInStock: {
      type: Number,
      min: 0
    },
    rating: {
      type: Number,
      max: 10
    }
  },
  { timestamps: true }
)

export default model('movie', movieSchema)
