import request from 'superagent'
import { Result } from '../models/GamesModel'

export async function getGames(): Promise<Result[]> {
  const response = await request.get('/api/v1/games')
  console.log(response.body)
  return response.body
}
