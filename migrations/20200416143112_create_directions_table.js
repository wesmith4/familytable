
exports.up = function(knex) {
  return knex.schema.createTable('directions', (table) => {
    table.increments('id').primary();
    table.integer('recipe_id').notNullable().references('recipes.id');
    table.integer('step').notNullable();
    table.text('action').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('directions');
};
