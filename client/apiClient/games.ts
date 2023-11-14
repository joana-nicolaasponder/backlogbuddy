import request from 'superagent'
// import { Result } from '../models/GamesModel'
import { Games } from '../models/UpdateGameModel'

export async function getGames(): Promise<Games[]> {
  const response = await request.get('/api/v1/games')
  console.log(response.body)
  return response.body
}

export async function searchGames(searchQuery: string): Promise<Games[]> {
  try {
    const response = await request
      .post('/api/v1/search')
      .query({ name: searchQuery })
    console.log('Response from apiclient:', response.body)
    return response.body
  } catch (error) {
    throw new Error('Error searching for games')
  }
}

export async function viewGame(name: string): Promise<Games[]> {
  return request.get(`/api/v1/game/${name}`).then((res) => res.body.name)
}
