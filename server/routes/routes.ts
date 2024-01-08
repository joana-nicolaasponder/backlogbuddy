import express from 'express'
import { addGame, getBacklogGames } from '../db/functions/functions'

const router = express.Router()

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
  const data = req.body
  console.log(data)
  const games = await addGame(data)
  res.status(200).json(games)
})
export default router
