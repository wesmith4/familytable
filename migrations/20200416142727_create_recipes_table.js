
exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('users.id');
    table.text('title').notNullable();
    table.text('creator_name');
    table.text('notes');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
