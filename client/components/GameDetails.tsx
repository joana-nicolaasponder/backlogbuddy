import { useParams } from 'react-router-dom'

import { viewGame } from '../apiClient/games'
import { useQuery } from '@tanstack/react-query'

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
    return <p>LOADING...</p>
  }

  console.log('Game details:', game)

  return (
    <div>
      <h1>{name}</h1>
      {game.map((g) => (
        <p key={g.id}>{g.summary}</p>
      ))}
    </div>
  )
}
