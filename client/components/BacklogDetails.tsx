import { Divider, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'
import { viewBacklogGame } from '../apiClient/games'

export default function BacklogDetails() {
  const { name } = useParams()

  const {
    data: game,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['backlog', name],
    queryFn: () => viewBacklogGame(name as string),
  })

  if (error) {
    return <p>There was an error trying to get the game details</p>
  }

  if (!game || isLoading) {
    return <p>Loading...</p>
  }

  console.log('frontend', game)

  const {
    game_title,
    image,
    genre,
    platform,
    publisher,
    mood,
    status,
    rating,
  } = game[0]

  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)">
      <GridItem colSpan={12}>
        <Heading
          as="h1"
          size="4xl"
          textColor="brand.500"
          textAlign="center"
          marginBottom="80px"
          marginLeft="80px"
          marginRight="80px"
          marginTop="40px"
        >
          {game_title}
        </Heading>
      </GridItem>

      <GridItem colSpan={4} marginLeft="80px">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${image}.jpg`}
          alt={`${game_title} cover`}
        ></Image>
      </GridItem>

      <GridItem colSpan={6} marginLeft="80px">
        <Heading marginBottom="1em">
          Added on: <Text>12/02/2024</Text>
        </Heading>
        <Heading marginBottom="1em">
          Playtime: <Text>200hrs</Text>
        </Heading>
        <Heading marginBottom="1em">
          How long to beat: <Text>infinite time</Text>
        </Heading>
        <Heading marginBottom="1em">
          Status: <Text color="green">{status}</Text>
        </Heading>
      </GridItem>
      <GridItem colSpan={4} marginLeft="80px" marginTop="24px">
        <Heading marginBottom="1em">
          Mood: <Text>{mood}</Text>
        </Heading>
        <Heading marginBottom="1em">
          Rating: <Text>{rating}</Text>
        </Heading>
        <Heading marginBottom="1em">
          Notes: <Text>This game is so much fun</Text>
        </Heading>
        <Heading marginBottom="1em">
          Platform I own it on:<Text>{platform}</Text>
        </Heading>
      </GridItem>
      <GridItem colSpan={10}>
        <Divider marginLeft="80px"></Divider>
      </GridItem>
      <GridItem colSpan={10} marginLeft="80px">
        <Heading marginTop="1em" marginBottom="1em" as="h3" size="lg">
          Publishers: <Text>{publisher}</Text>
        </Heading>
      </GridItem>
    </Grid>
  )
}
