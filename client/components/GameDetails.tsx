import { useState, useEffect } from 'react'
import { getGames } from '../apiClient/games'
import { Games, Result } from '../models/GamesModel'

export default function ListGames() {
  const [games, setGames] = useState<Result[] | null>(null)

  async function fetchGames() {
    try {
      const gameData = await getGames()
      setGames(gameData.results) // Assuming gameData is of type Games
    } catch (error) {
      console.log(error)
      // Handle error or set default value for games in case of failure
      setGames([])
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <>
      <h2>Games</h2>
      <form></form>
      <ul>
        {games !== null ? (
          games.map((game) => <li key={game.id}>{game.name}</li>)
        ) : (
          <p>Loading or No Games Available</p>
        )}
      </ul>
    </>
  )
}
