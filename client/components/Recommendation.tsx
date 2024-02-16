import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { recommendGame } from '../apiClient/games'
import { useQuery } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'

export default function Recommendation() {
  const { genre } = useParams()
  console.log({ genre })

  const {
    data: game,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['backlog', genre],
    queryFn: () => recommendGame(genre as string),
  })

  if (error) {
    return <p>There was an error</p>
  }

  if (!genre || isLoading) {
    return <p>Loading...</p>
  }

  console.log('from the frontend', game)

  return (
    <>
      <Heading as="h2" size="lg" textAlign="center" m={4}>
        Have you considered these out of backlog?
      </Heading>
      <SimpleGrid columns={[2, null, 3]} spacing="8" p="4">
        {game.map((g) => (
          <Box
            key={g.id}
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            my="2"
            bg="gray.100"
            boxShadow="md"
            position="relative"
          >
            <Text fontSize="xl">{g.game_title}</Text>
            <Text fontSize="md">{g.platform}</Text>
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${g.image}.jpg`}
              alt={g.game_title}
              borderRadius="md"
              fallbackSrc="https://via.placeholder.com/150?text=No+Image"
            />
            <Text fontSize="xl">
              This scratches the itch because it has the genre you want to play:{' '}
              {g.genre}. You were feeling {g.mood} when you bought the game.
            </Text>
            <Button size="sm" top="2" border="solid" onClick={() => {}}>
              Add to Currently Playing
            </Button>
          </Box>
        ))}
        <Button
          size="sm"
          bottom="2"
          position="absolute"
          right="2"
          onClick={() => {}}
        >
          I Want To Buy
        </Button>
      </SimpleGrid>
    </>
  )
}
