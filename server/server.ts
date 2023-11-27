import * as Path from 'node:path'
import express from 'express'
import request from 'superagent'
import cors, { CorsOptions } from 'cors'
import debounce from 'lodash/debounce'

import 'dotenv/config'

const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))

//SEARCH
const debouncedSearch = debounce(async (searchQuery, res) => {
  try {
    // const searchQuery = req.query.name
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
}, 30)

server.post('/api/v1/search', (req, res) => {
  const searchQuery = req.query.name

  debouncedSearch(searchQuery, res)
})

// this one works!!
// SINGLE GAME DETAILS
server.post('/api/v1/games/:name', async (req, res) => {
  try {
    const name = req.params.name
    // console.log('FROM SERVER', req)
    // console.log('this is from server', name)
    const response = await request
      .post(`https://api.igdb.com/v4/games/`)
      .query({
        search: `${name}`,
        fields: `name, summary, cover.image_id, genres.name, release_dates.human, platforms.name, first_release_date, storyline, platforms.name, involved_companies.company.name, screenshots.image_id`,
      })
      .set('Authorization', `Bearer ${process.env.GAME_API_TOKEN}`)
      .set('Client-ID', `${process.env.GAME_API_KEY}`)
    // console.log('Response from name server:', response.body)

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
