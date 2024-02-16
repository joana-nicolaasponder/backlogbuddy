import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteBacklogGame, getBacklogGames } from '../apiClient/games'
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Backlog() {
  const queryClient = useQueryClient()

  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['backlog'],
    queryFn: () => getBacklogGames(),
  })

  if (error) {
    return <p>There was an error trying to get the games</p>
  }

  if (!games || isLoading) {
    return <p>Loading...</p>
  }

  const handleDelete = async (name: string) => {
    try {
      await deleteBacklogGame(name)
      queryClient.invalidateQueries('backlog')
    } catch (error) {
      console.log('error deleting game:', error)
    }
  }

  return (
    <Box m="5">
      <Flex mb="5">
        <Heading as="h1" size="xl" letterSpacing={'tighter'}>
          Joana's Backlog
        </Heading>
        <Spacer />
        <Button colorScheme="teal" mr="4">
          ADD
        </Button>
        <Button colorScheme="teal">FILTER</Button>
      </Flex>
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {games.map((game) => (
          <GridItem
            key={game.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image}.jpg`}
              alt={game.game_title}
              width="100%"
              height="auto"
            />
            <Box p="4">
              <Box display="flex" alignItems="baseline">
                <Text
                  fontWeight="bold"
                  letterSpacing="wide"
                  fontSize="md"
                  isTruncated
                >
                  {game.game_title}
                </Text>
                <Spacer />
                
              </Box>
              <Text
                mt="1"
                fontSize="sm"
                fontWeight="semibold"
                lineHeight="tight"
                isTruncated
              >
                {game.genre}
              </Text>
              <Text mt="2" fontSize="sm">
                I own it on: {game.platform}
              </Text>
              <Flex mt="3" justifyContent="space-between">
                <Link to={`/games/backlog/${game.game_title}`}>
                  <Button size="sm">More Details</Button>
                </Link>
                <Button size="sm" onClick={() => handleDelete(game.game_title)}>
                  Delete
                </Button>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
