import request from 'superagent'
import { Result } from '../models/GamesModel'
import { Games } from '../models/UpdateGameModel'

export async function getGames(): Promise<Games[]> {
  const response = await request.get('/api/v1/games')
  console.log(response.body)
  return response.body
}

export async function searchGames(searchQuery: string): Promise<Games[]> {
  try {
    const response = await request
      .post('/api/v1/search') // Point to your search endpoint
      .query({ name: searchQuery }) // Assuming the query parameter is 'name'
    console.log('Response from apiclient:', response.body)
    return response.body
  } catch (error) {
    throw new Error('Error searching for games')
  }
}
