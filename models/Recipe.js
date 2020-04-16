
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
        userId: {type: 'integer'},
        title: {type: 'string'},
        creatorName: {type: 'string'},
        notes: {type: ['string', 'null']},
      }
    }
  }

  static get relationMappings() {
    let Ingredient = require('./Ingredient');
    let Direction = require('./Direction');
    return {
      ingredients: {
        relation: Model.HasManyRelation,
        modelClass: Ingredient,
        join: {
          from: 'recipes.id',
          to: 'ingredients.recipe_id'
        }
      },
      directions: {
        relation: Model.HasManyRelation,
        modelClass: Direction,
        join: {
          from: 'recipes.id',
          to: 'directions.recipe_id'
        }
      }
    }
  }
}

module.exports = Recipe;
