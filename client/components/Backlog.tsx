import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteBacklogGame, getBacklogGames } from '../apiClient/games'
import { Text, Image, Button, Grid, GridItem } from '@chakra-ui/react'
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
    <>
      <Grid gridTemplateColumns="repeat(12, 1fr)" margin="80px">
        {games.map((game) => (
          <GridItem
            colSpan={3}
            key={game.id}
            border="solid"
            padding="10px"
            margin="5px"
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image}.jpg`}
              alt={game.game_title}
            />
            <Text fontSize="2xl" fontWeight="bold">
              {game.game_title}
            </Text>
            <Text fontSize="xl">{game.genre}</Text>
            <Text fontSize="medium">I own it on: {game.platform}</Text>

            <Link to={`/games/backlog/${game.game_title}`}>
              <Button margin={10}>More Details</Button>
            </Link>
            <Button onClick={() => handleDelete(game.game_title)}>
              Delete
            </Button>
          </GridItem>
        ))}
      </Grid>
    </>
  )
}
