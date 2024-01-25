import express from 'express'
import request from 'superagent'

import {
  addBacklogGame,
  getBacklogGames,
  recommendGame,
  viewBacklogGame,
} from '../db/functions/functions'

const router = express.Router()

//GET /api/v1/games
// router.get('/', async (req, res) => {
//   const games = await request.get('/')
//   console.log('This is logged from the routes', games)
//   res.json(games)
// })

// router.get('/games/search', async (req, res) => {
//   const games = await request.get('/search')
//   res.json(games)
// })

// router.get('/games/:name', async (req, res) => {
//   const games = await request.get('/:name')
//   res.json(games)
// })

// router.get('/games/:name/add', async (req, res) => {
//   const games = await request.get('/:name/add')
//   res.json(games)
// })

// router.get('/games/buy', async (req, res) => {
//   const games = await request.get('/games/buy')
//   res.json(games)
// })

// router.get('/games/buy/:name', async (req, res) => {
//   const games = await request.get('/games/buy/:name')
//   res.json(games)
// })

// BACKLOG

router.get('/backlog', async (req, res) => {
  try {
    const games = await getBacklogGames()
    res.status(200).json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/backlog', async (req, res) => {
  console.log('POST REQUEST BACKLOG')
  console.log(req.body)
  const data = req.body
  const games = await addBacklogGame(data)
  res.status(200).json(games)
})

router.get(`/games/recommended/:genre`, async (req, res) => {
  console.log('REC REQUEST BACKLOG ', req.params.genre)
  const data = req.params.genre
  const games = await recommendGame(data)
  console.log('GAMES BACKLOG', games)
  res.status(200).json(games)
})

router.get(`/backlog/:name`, async (req, res) => {
  console.log('BACKLOG VIEW', req.params.name)
  const data = req.params.name
  const game = await viewBacklogGame(data)
  console.log('BACKLOG GAME', game)
  res.status(200).json(game)
})

export default router
