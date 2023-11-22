import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Box, Card, Heading, Image, Skeleton, Stack } from '@chakra-ui/react'
import { viewGame } from '../apiClient/games'

export default function GameDetails() {
  const { name } = useParams()

  const {
    data: game,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['game', name],
    queryFn: () => viewGame(name as string),
  })

  if (error) {
    return <p>There was an error trying to get the game details</p>
  }

  if (!game || isLoading) {
    return <p>Loading...</p>
  }

  const { name: gameName, cover, summary, genres, release_dates } = game[0]

  return (
    <Card bg="brand.800" color="white" p="4" maxW="800px" mx="auto">
      <Box textAlign="center">
        <Heading as="h1" textColor="brand.500">
          {gameName}
        </Heading>
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`}
          alt={`${gameName} cover`}
          boxSize="200px"
          mx="auto"
          mb="4"
        />
      </Box>
      <Box>
        <Heading as="h2" textColor="brand.500">
          Summary:
        </Heading>
        <p className="game-summary">{summary}</p>
        <Heading as="h2" textColor="brand.500">
          Genres:{' '}
        </Heading>
        {genres.map((genre) => (
          <p key={genre.id} className="game-genre">
            {genre.name}
          </p>
        ))}
        {/* Add more details if needed */}
        <Heading as="h2" textColor="brand.500">
          Released on:{' '}
        </Heading>
        {release_dates.map((release) => (
          <p key={release.id} className="game-release">
            {release.human}
          </p>
        ))}
      </Box>
    </Card>
  )
}
