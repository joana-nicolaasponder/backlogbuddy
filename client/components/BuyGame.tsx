import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ListItem,
  Select,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

import { Game, Games } from '../models/GameModel'
import { useEffect, useState } from 'react'
import { searchGames } from '../apiClient/games'

export default function BuyGame() {
  const [searchQuery, setSearchQuery] = useState('')
  const [games, setGames] = useState<Games[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [selectedGameName, setSelectedGameName] = useState<string | null>(null)

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

  const handleSelectGame = (selectedGame: Game) => {
    setSelectedGame(selectedGame)
    setSelectedGameName(selectedGame.name)
  }

  console.log('check', selectedGameName)

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

      <UnorderedList spacing="2" marginBottom={10}>
        {games && games.length > 0 ? (
          games.map((game) => (
            <ListItem key={game.id}>
              <Link to={`/games/buy/${game.name.toLowerCase()}`}>
                {game.name}
              </Link>
            </ListItem>
          ))
        ) : (
          <p>No matching games found</p>
        )}
      </UnorderedList>
      <Link to="/">Back</Link>
    </>
  )
}
