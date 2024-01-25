import request from 'superagent'

import { Games, Game, BacklogGames, GameData, Genre } from '../models/GameModel'

export async function searchGames(searchQuery: string): Promise<Games[]> {
  try {
    const response = await request
      .post('/api/v1/search')
      .query({ name: searchQuery })
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

export async function addGame(name: string): Promise<Game[]> {
  console.log('ADDING:', name)
  const formattedName = name.replace(/[^\w\s]/g, '').toLowerCase()

  const response = await request.post(`/api/v1/games/${formattedName}/add`)
  console.log(response.body)
  return response.body
}

export async function addBacklogGame(game: GameData) {
  console.log('ADD TO BACKLOG:', game)
  const response = await request.post('/api/v1/routes/backlog').send(game)
  console.log(response)
  return response.body
}

export async function buyGame(name: string): Promise<Game[]> {
  console.log('chosen game to buy from apiclient:', name)
  const formattedName = name.replace(/[^\w\s]/g, '').toLowerCase()
  const response = await request.post(`/api/v1/games/buy/${formattedName}`)
  console.log('this is from the api client buygame:', response.body)
  return response.body
}

export async function getBacklogGames(): Promise<BacklogGames[]> {
  const data = await request.get('/api/v1/routes/backlog')
  console.log('API', data.body)
  return data.body
}

export async function recommendGame(genre: string) {
  console.log('REC REQUEST: ', genre)
  const response = await await request.get(
    `/api/v1/routes/games/recommended/${genre}`
  )
  console.log('This is from the API REC: ', response.body)
  return response.body
}

export async function viewBacklogGame(name: string) {
  console.log('BACKLOG REQ TO VIEW', name)
  const data = await request.get(`/api/v1/routes/backlog/${name}`)
  return data.body
}

export async function deleteBacklogGame(name: string) {
  console.log('REQ to delete', name)
  const response = await request.del(`/api/v1/routes/backlog/${name}`)
  return response.body
}
