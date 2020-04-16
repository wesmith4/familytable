let { Model, snakeCaseMappers } = require('objection');

class Ingredient extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'ingredients';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'recipeId',
        'ingredient',
        'quantity'
      ],
      properties: {
        id: {type: 'integer'},
        recipeId: {type: 'integer'},
        ingredient: {type: 'string'},
        quantity: {type: 'string'}
      }
    }
  }
}

module.exports = Ingredient;
