import { useQuery } from '@tanstack/react-query'
import { getBacklogGames } from '../apiClient/games'
import { Text, Image, SimpleGrid, Box, Button } from '@chakra-ui/react'

export default function Backlog() {
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

  return (
    <>
      <SimpleGrid columns={[2, null, 3]} spacing="40px" marginTop={10}>
        {games.map((game) => (
          <Box key={game.id} border="solid" padding="10px" margin="5px">
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image}.jpg`}
              alt={game.game_title}
            />
            <Text fontSize="2xl" fontWeight="bold" color="peachpuff">
              {game.game_title}
            </Text>
            <Text fontSize="xl">{game.genre}</Text>
            <Text fontSize="medium">I own it on: {game.platform}</Text>
            <Button margin={10}>Edit</Button>
            <Button>Delete</Button>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}
