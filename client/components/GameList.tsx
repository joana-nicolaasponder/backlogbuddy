import { useState, useEffect } from 'react'
import { searchGames } from '../apiClient/games'
import { Games } from '../models/GameModel'
import { Link } from 'react-router-dom'
import { FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import { ListItem, UnorderedList } from '@chakra-ui/react'
import { debounce } from 'lodash'

export default function GameList() {
  const [games, setGames] = useState<Games[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const debouncedSearch = debounce(async (query) => {
      try {
        const data = await searchGames(query)
        setGames(data)
      } catch (error) {
        console.error('Error searching for games')
      }
    }, 300)

    if (searchQuery) {
      debouncedSearch(searchQuery)
    } else {
      setGames([])
    }

    return () => debouncedSearch.cancel()
  }, [searchQuery])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <Heading as="h2" size="lg" marginBottom="4">
        🎮 Find a game to add to your backlog 🎮
      </Heading>
      
      <FormControl marginBottom="6">
        <FormLabel></FormLabel>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a game"
          width="100%"
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
