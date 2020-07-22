var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/itcast')

var Schema = mongoose.Schema

var stuSchema = new Schema({
  // id: {
  //   type: Number,
  //   // required: true
  // },
  name: {
    type: String,
    // required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    // required: true
  },
  hobbies: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Student', stuSchema)
