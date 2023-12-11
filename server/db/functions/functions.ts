import {
  BacklogGame,
  BacklogGames,
  Game,
  Games,
} from '../../../client/models/GameModel.ts'
import connection from '../connection.ts'

export async function getBacklogGames(): Promise<BacklogGames[]> {
  const data = await connection('backlog').select('*')
  return data as BacklogGames[]
}
