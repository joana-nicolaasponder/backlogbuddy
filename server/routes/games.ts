import express from 'express'
import request from 'superagent'

const router = express.Router()

//GET /api/v1/games
router.get('/', async (req, res) => {
  const games = await request.get('/')
  console.log('This is logged from the routes', games)
  res.json(games)
})

router.get('/games/search', async (req, res) => {
  const games = await request.get('/search')
  res.json(games)
})

router.get('/games/:name', async (req, res) => {
  const games = await request.get('/:name')
  res.json(games)
})

router.get('/games/buy', async (req, res) => {
  const games = await request.get('/games/buy')
  res.json(games)
})

router.get('/games/buy/:name', async (req, res) => {
  const games = await request.get('/games/buy/:name')
  res.json(games)
})

export default router
