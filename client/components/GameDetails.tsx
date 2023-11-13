import { useState, useEffect } from 'react'
import { searchGames } from '../apiClient/games' // Adjust the import path as necessary
import { Games } from '../models/UpdateGameModel'
export default function ListGames() {
  const [games, setGames] = useState<Games[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery) {
      searchGames(searchQuery)
        .then((data) => setGames(data))
        .catch((error) => console.error(error))
    } else {
      setGames([]) // Clear games if the search query is empty
    }
  }, [searchQuery])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <h2>Games</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a game"
      />
      <ul>
        {games && games.length > 0 ? (
          games.map((game) => <li key={game.id}>{game.name}</li>)
        ) : (
          <p>No matching games found</p>
        )}
      </ul>
    </>
  )
}
