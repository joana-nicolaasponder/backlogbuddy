import { BacklogGames, GameData } from '../../../client/models/GameModel.ts'
import connection from '../connection.ts'

export async function getBacklogGames(): Promise<BacklogGames[]> {
  const data = await connection('backlog').select('*')
  return data as BacklogGames[]
}

export async function addGame(game: GameData) {
  const data = await connection('backlog').insert(game).returning('*')
  return data as BacklogGames[]
}
