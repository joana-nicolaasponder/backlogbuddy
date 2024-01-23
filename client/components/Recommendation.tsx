import { Box, Heading, Image, Text } from '@chakra-ui/react'
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
      <Heading>{`Recommended ${genre} Games`}</Heading>
      {game.map((g) => (
        <Box key={g.id} borderWidth="1px" borderRadius="lg" p="4" my="2">
          <Text>{g.game_title}</Text>
          <Text>{g.platform}</Text>
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${g.image}.jpg`}
            alt={g.game_title}
          />
        </Box>
      ))}
    </>
  )
}
