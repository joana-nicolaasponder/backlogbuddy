import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react'

import { Game, Games } from '../models/GameModel'
import { useEffect, useState } from 'react'
import { searchGames } from '../apiClient/games'

export default function BuyGame() {
  const [searchQuery, setSearchQuery] = useState('')
  const [games, setGames] = useState<Games[]>([])
  const [selectedGame, setSelectedGame] = useState<Game[]>([])

  useEffect(() => {
    if (searchQuery) {
      searchGames(searchQuery)
        .then((data) => setGames(data))
        .catch((error) => console.error(error))
    } else {
      setGames([])
    }
  }, [searchQuery])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    setSelectedGame(null)
  }

  const handleSelectGame = (selectedGame) => {
    setSelectedGame(selectedGame)
  }

  return (
    <>
      <Heading as="h1" size="4xl" color="brand.500">
        What game are you considering?
      </Heading>

      <FormControl marginBottom="6">
        <FormLabel>Search games</FormLabel>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a game"
        />
      </FormControl>

      <Select placeholder="Your choice" marginBottom={2}>
        {games && games.length > 0 ? (
          games.map((game) => (
            <option key={game.id} onClick={() => handleSelectGame(game)}>
              {game.name}
            </option>
          ))
        ) : (
          <p>No matching games found</p>
        )}
      </Select>
    </>
  )
}
