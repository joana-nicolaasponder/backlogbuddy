import { useState, useEffect } from 'react'
import { searchGames } from '../apiClient/games' // Adjust the import path as necessary
import { Games } from '../models/GameModel'
import { Link } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Center,
  Input,
  Spacer,
} from '@chakra-ui/react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import Homepage from './Homepage'

export default function GameList() {
  const [games, setGames] = useState<Games[]>([])
  const [searchQuery, setSearchQuery] = useState('')

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
  }

  return (
    <>
      <Heading as="h2" size="lg" marginBottom="4">
        🎮 Find a game 🎮
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
              <Link to={`/games/${game.name.toLowerCase()}`}>{game.name}</Link>
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
