let { Model, snakeCaseMappers } = require('objection');

class Direction extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'directions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'recipeId',
        'step',
        'action'
      ],
      properties: {
        id: {type: 'integer'},
        recipeId: {type: 'integer'},
        step: {type: 'integer'},
        action: {type: 'string'}
      }
    }
  }
}

module.exports = Direction;
