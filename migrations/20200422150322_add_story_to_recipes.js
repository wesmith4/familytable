
exports.up = function(knex) {
  return knex.schema.table('recipes', (table) => {
    table.text('story');
  })
};

exports.down = function(knex) {
  return knex.schema.table('recipes', (table) => {
    table.dropColumn('story');
  })
};
