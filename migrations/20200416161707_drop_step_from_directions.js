
exports.up = function(knex) {
  return knex.schema.table('directions', (table) => {
    table.dropColumn('step');
  });
};

exports.down = function(knex) {
  return knex.schema.table('directions', (table) => {
    table.integer('step');
  });
};
