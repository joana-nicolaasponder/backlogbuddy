/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('backlog').del()
  await knex('backlog').insert([
    {
      id: 1,
      game_title: 'Ooblets',
      genre: 'Adventure, Indie, Role-Playing (RPG), Simulator',
      platform: 'Nintendo Switch',
      rating: '2/5',
      publisher: 'Glumberland, Double Fine Productions',
      status: 'dropped',
      mood: 'bored',
      image: 'co2dfx',
    },
    {
      id: 2,
      game_title: 'Animal Crossing: New Horizons',
      genre: 'Simulator',
      platform: 'Nintendo Switch',
      rating: '5/5',
      publisher: 'Nintendo',
      status: 'finished',
      mood: 'cozy',
      image: 'co3wls',
    },
  ])
}
