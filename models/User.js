
const { Model, snakeCaseMappers } = require('objection');
const Password = require('objection-password')();

class User extends Password(Model) {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'email',
        'password',
        'username'
      ],
      properties: {
        id: {type: 'integer'},
        email: {type: 'string'},
        password: {type: 'string'},
        username: {type: 'string'},
        fullName: {type: ['string', 'null']}
      }
    }
  }

  static get relationMappings() {
    let Recipe = require('./Recipe');
    return {
      recipes: {
        relation: Model.HasManyRelation,
        modelClass: Recipe,
        join: {
          from: 'users.id',
          to: 'recipes.user_id'
        }
      }
    }
  }
}

module.exports = User;
