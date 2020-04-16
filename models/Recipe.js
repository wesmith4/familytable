const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RecipeSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: false},
  _creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  creatorName: {type: String},
  ingredients: {type: Array, required: true, unique: false},
  directions: {type: Array, required: true, unique: false},
  notes: {type: String, required: false, unique: false},
  image: {type: String, required: false, unique: false}
});

module.exports = mongoose.model('Recipe', RecipeSchema);

const { Model, snakeCaseMappers } = require('objection');

class Recipe extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'recipes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [

      ],
      properties: {
        id: {type: 'integer'},
        title: {type: 'string'},
        creatorName: {type: 'string'},
        notes: {type: ['string', 'null']},
      }
    }
  }
}

module.exports = Recipe;
