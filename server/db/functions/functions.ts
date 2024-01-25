import { BacklogGames, GameData } from '../../../client/models/GameModel.ts'
import connection from '../connection.ts'

export async function getBacklogGames(): Promise<BacklogGames[]> {
  const data = await connection('backlog').select('*')
  return data as BacklogGames[]
}

export async function addBacklogGame(game: GameData) {
  const data = await connection('backlog').insert(game).returning('*')
  return data as BacklogGames[]
}

export async function recommendGame(genre: string) {
  const data = await connection('backlog').whereLike('genre', `%${genre}%`)
  return data as BacklogGames[]
}

export async function viewBacklogGame(name: string) {
  const data = await connection('backlog').where('game_title', name)
  return data as BacklogGames[]
}
