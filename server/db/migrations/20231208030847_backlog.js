/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('backlog', function (table) {
    table.increments('id')

    table.string('game_title')
    table.string('genre')
    table.string('platform')
    table.string('publisher')
    table.string('mood')
    table.string('status')
    table.integer('rating')
    table.string('image')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('backlog')
}
