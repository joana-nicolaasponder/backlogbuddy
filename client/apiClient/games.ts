import request from 'superagent'

import { Games, Game } from '../models/GameModel'

export async function searchGames(searchQuery: string): Promise<Games[]> {
  try {
    const response = await request
      .post('/api/v1/search')
      .query({ name: searchQuery })
    // console.log('this is the URL from api:', `/api/v1/search/${searchQuery}`)
    // console.log('Response from apiclient:', response.body)
    return response.body
  } catch (error) {
    throw new Error('Error searching for games')
  }
}

export async function viewGame(name: string): Promise<Game[]> {
  console.log('chosen game from apiclient:', name)
  const formattedName = name
    .replace(/[^\w\s]/g, '')
    // .replace(/\s+/g, '-') <--- had to remove this! coral%20island coral-island
    .toLowerCase()
  // console.log('this is the formatted name:', formattedName)
  // console.log('this is the URL call:', `api/v1/games/${formattedName}`)
  const response = await request.post(`/api/v1/games/${formattedName}`)
  console.log('this is from the api client:', response.body)
  return response.body
}
