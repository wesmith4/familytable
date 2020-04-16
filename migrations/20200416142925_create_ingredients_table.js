
exports.up = function(knex) {
  return knex.schema.createTable('ingredients', (table) => {
    table.increments('id').primary();
    table.integer('recipe_id').notNullable().references('recipes.id');
    table.text('ingredient').notNullable();
    table.text('quantity').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ingredients');
};
