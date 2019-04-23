const mongoose = require('mongoose');
// create schema
const { Schema } = mongoose;

// create book model
const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

// export the model
module.exports = mongoose.model('Book', bookModel);
