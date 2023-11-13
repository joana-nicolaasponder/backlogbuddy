import * as Path from 'node:path'
import express from 'express'
import request from 'superagent'
import cors, { CorsOptions } from 'cors'

import 'dotenv/config'

// console.log('this is your toke', process.env.GAME_API_TOKEN)

const server = express()

server.get('/api/v1/greeting', (req, res) => {
  const greetings = ['hola', 'hi', 'hello', 'howdy']
  const index = Math.floor(Math.random() * greetings.length)
  console.log(index)
  res.json({ greeting: greetings[index] })
})

server.use(express.json())
server.use(cors('*' as CorsOptions))

// server.use('/api/v1/games', games)
server.get('/api/v1/games', async (req, res) => {
  try {
    const response = await request
      .get('https://api.rawg.io/api/games?key=e057c5112b9746c7b91a996ed2b3eee1')
      .query(`search mario`)
    console.log('this is the server', response.body)
    res.json(response.body) // Send the response back to the client
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching games') // Handle errors properly
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
