import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: String, // optional for Google users
    googleId: String,
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local'
    }
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)