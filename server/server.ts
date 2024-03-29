import * as Path from 'node:path'
import express from 'express'
import request from 'superagent'
import cors, { CorsOptions } from 'cors'

import 'dotenv/config'
import routes from '../server/routes/routes.ts'

const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))
server.use('/api/v1/routes', routes)

//SEARCH

server.post('/api/v1/search', async (req, res) => {
  const searchQuery = req.query.name
  try {
    const response = await request
      .post('https://api.igdb.com/v4/games')

      .query({
        search: `${searchQuery}`,
        fields: 'name, id',
        limit: 250,
      })

      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)

    console.log('Response from search server:', response.body)

    res.json(response.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching games')
  }
})

// SINGLE GAME DETAILS
server.post('/api/v1/games/:name', async (req, res) => {
  try {
    const name = req.params.name

    const response = await request
      .post(`https://api.igdb.com/v4/games/`)
      .query({
        search: `${name}`,
        fields: `name, summary, cover.image_id, genres.name, release_dates.human, platforms.name, first_release_date, storyline, platforms.name, involved_companies.company.name, screenshots.image_id`,
      })
      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)

    res.json(response.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching game details')
  }
})

server.post('/api/v1/games/:name/add', async (req, res) => {
  try {
    console.log('SERVER REQUEST TO ADD')
    const name = req.params.name

    const response = await request
      .post(`https://api.igdb.com/v4/games/`)
      .query({
        search: `${name}`,
        fields: `name, summary, cover.image_id, genres.name, release_dates.human, platforms.name, first_release_date, storyline, platforms.name, involved_companies.company.name, screenshots.image_id`,
      })
      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)

    res.json(response.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching game details')
  }
})

// BUY PAGE
server.post('/api/v1/games/buy/:name', async (req, res) => {
  try {
    const name = req.params.name

    const response = await request
      .post(`https://api.igdb.com/v4/games/`)
      .query({
        search: `${name}`,
        fields: `name, summary, cover.image_id, genres.name, release_dates.human, platforms.name, first_release_date, storyline, platforms.name, involved_companies.company.name, screenshots.image_id`,
      })
      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)

    res.json(response.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching game details')
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
