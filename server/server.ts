import * as Path from 'node:path'
import express from 'express'
import request from 'superagent'
import cors, { CorsOptions } from 'cors'

import 'dotenv/config'

// console.log('this is your token', process.env.GAME_API_TOKEN)

const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))

server.post('/api/v1/search', async (req, res) => {
  try {
    const searchQuery = req.query.name
    const response = await request
      .post('https://api.igdb.com/v4/games')

      .query({ search: `${searchQuery}`, fields: 'name, summary', limit: 250 })

      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)

    console.log('Response from server:', response.body)

    res.json(response.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching games')
  }
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
