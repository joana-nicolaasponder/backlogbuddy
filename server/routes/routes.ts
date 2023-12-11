import express from 'express'
import { getBacklogGames } from '../db/functions/functions'

const router = express.Router()

router.get('/backlog', async (req, res) => {
  try {
    const games = await getBacklogGames()
    res.status(200).json(games)
  } catch (error) {
    console.error('Error fetching Ducks:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
