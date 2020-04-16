
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.text('username').notNullable();
    table.text('full_name');
    table.unique('email');
    table.unique('username');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
