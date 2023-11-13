import request from 'superagent'
import { Games, Result } from '../models/GamesModel'

export async function getGames(): Promise<Games> {
  const response = await request.get('/api/v1/games')
  console.log(response.body)
  return response.body
}
