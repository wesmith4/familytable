const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: false},
  author: {type: String, required: true, unique: false},
  ingredients: {type: Array, required: true, unique: false},
  directions: {type: Array, required: true, unique: false},
  image: {type: String, required: false, unique: false}
});

module.exports = mongoose.model('Recipe', RecipeSchema);
