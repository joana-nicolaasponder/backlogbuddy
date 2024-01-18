import { useQuery } from '@tanstack/react-query'
import { getBacklogGames } from '../apiClient/games'
import { ListItem, Text, UnorderedList, Image } from '@chakra-ui/react'

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
      <UnorderedList>
        {games.map((game) => (
          <ListItem key={game.id}>
            <Text>{game.game_title}</Text>
            <Text>{game.genre}</Text>
            <Text>{game.platform}</Text>
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image}.jpg`}
              alt={game.game_title}
            />
          </ListItem>
        ))}
      </UnorderedList>
    </>
  )
}
