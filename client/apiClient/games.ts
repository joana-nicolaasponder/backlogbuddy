import request from 'superagent'

import { Games } from '../models/UpdateGameModel'

export async function searchGames(searchQuery: string): Promise<Games[]> {
  try {
    const response = await request
      .post('/api/v1/search')
      .query({ name: searchQuery })
    console.log('this is the URL from api:', `/api/v1/search/${searchQuery}`)
    console.log('Response from apiclient:', response.body)
    return response.body
  } catch (error) {
    throw new Error('Error searching for games')
  }
}

//With this, i get like three random games and their names
// and descriptoin
// export async function viewGame(name: string): Promise<Games[]> {
//   console.log('chosen game from apiclient:', name)
//   const formattedName = name
//     .replace(/[^\w\s]/g, '')
//     .replace(/\s+/g, '-')
//     .toLowerCase()

//   console.log('this is the URL call:', `api/v1/games/${formattedName}`)
//   const response = await request.get(`/api/v1/games/${formattedName}`)
//   console.log('this is from the api client:', response)
//   return response.body
// }

//i get an empty array but the game title shows up
export async function viewGame(name: string): Promise<Games[]> {
  console.log('chosen game from apiclient:', name)
  const formattedName = name
    .replace(/[^\w\s]/g, '')
    // .replace(/\s+/g, '-')
    .toLowerCase()
  console.log('this is the formatted name:', formattedName)
  console.log('this is the URL call:', `api/v1/games/${formattedName}`)
  const response = await request.post(`/api/v1/games/${formattedName}`)
  console.log('this is from the api client:', response)
  return response.body
}
