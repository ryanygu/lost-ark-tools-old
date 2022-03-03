const mongoose = require('mongoose')

const engravingSchema = mongoose.Schema({
  rarity: String,
  line1: [String],
  line2: [String],
  line3: [String],
  score: Number,
  user:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

engravingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Engraving', engravingSchema)