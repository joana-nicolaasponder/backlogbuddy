import * as Path from 'node:path'
import express from 'express'
import request from 'superagent'
import cors, { CorsOptions } from 'cors'
import games from './routes/games'

import 'dotenv/config'

// console.log('this is your token', process.env.GAME_API_TOKEN)

const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))
// server.use('/api/v1/games', games)

server.post('/api/v1/search', async (req, res) => {
  try {
    const searchQuery = req.query.name
    const response = await request
      .post('https://api.igdb.com/v4/games')

      .query({ search: `${searchQuery}`, fields: 'name, summary', limit: 250 })

      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)

    console.log('Response from search server:', response.body)

    res.json(response.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching games')
  }
})
// this one works!!
server.post('/api/v1/games/:name', async (req, res) => {
  try {
    const name = req.params.name
    console.log('FROM SERVER', req)
    console.log('this is from server', name)
    const response = await request
      .post(`https://api.igdb.com/v4/games/`)
      .query({ search: `${name}`, fields: `name, summary, cover.image_id` })
      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)
    console.log('Response from name server:', response.body)

    res.json(response.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching game details')
  }
})

// server.post('/api/v1/games/:name', async (req, res) => {
//   try {
//     const name = req.params.name
//     const response = await request
//       .post(`https://api.igdb.com/v4/games/`)
//       .query({ search: `${name}`, fields: `name, summary, cover` })
//       .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
//       .set('Client-ID', `${process.env.GAME_API_KEY}`)

//     const gameDetails = response.body[0] // Assuming the first result is the one you want

//     if (gameDetails) {
//       const coverId = gameDetails.cover
//       console.log(coverId)

//       // Fetch cover details
//       const coverResponse = await request
//         .post(`https://api.igdb.com/v4/covers/`)
//         .query({ ids: `${coverId}`, fields: `url` })
//         .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
//         .set('Client-ID', `${process.env.GAME_API_KEY}`)

//       const coverUrl = coverResponse.body[0]?.url

//       // Attach cover URL to the game details
//       gameDetails.coverUrl = coverUrl
//     }
//     console.log(gameDetails)
//     res.json(gameDetails)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send('Error fetching game details')
//   }
// })

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
