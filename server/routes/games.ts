import express from 'express'
import request from 'superagent'

const router = express.Router()

//GET /api/v1/games
router.get('/', async (req, res) => {
  const games = await request.get('/')
  console.log('This is logged from the routes', games)
  res.json(games)
})



export default router
