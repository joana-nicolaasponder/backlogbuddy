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
    <>
      <div>
        <div className="container">
          {game.map((g) => (
            <>
              <h1>{g.name}</h1>
              <img
                className="cover-image"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover.image_id}.jpg`}
                alt={`${g.name} cover`}
              />
              <p className="game-summary" key={g.id}>
                {g.summary}
              </p>
            </>
          ))}
        </div>
      </div>
    </>
  )
}
