import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { viewGame } from '../apiClient/games'

import AddGame from './AddGame'

export default function GameDetails() {
  const { name } = useParams()

  const [addToBackLogClicked, setAddToBackLogClicked] = useState(false)
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

  const {
    name: gameName,
    cover,
    summary,
    genres,
    first_release_date,
    platforms,

    involved_companies,
    screenshots,
  } = game[0]

  // console.log(genres)
  // console.log(involved_companies)

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000) // Convert to milliseconds
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)">
      <GridItem colSpan={4}>
        <Heading
          as="h1"
          size="4xl"
          textColor="brand.500"
          textAlign="center"
          marginBottom="80px"
        >
          {gameName}
        </Heading>
      </GridItem>

      <GridItem colSpan={4}>
        <Grid gridTemplateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={2} marginLeft="500px">
            <Center>
              <Image
                borderRadius="5px"
                margin="auto 0"
                objectFit="cover"
                boxSize={['300px', '300px']}
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${cover.image_id}.jpg`}
                alt={`${gameName} cover`}
              />
            </Center>
          </GridItem>
          <GridItem colSpan={1}>
            <Heading as="h3" size="lg" textColor="brand.600">
              Released on:
            </Heading>
            <Text fontSize="xl" textColor="brand.500" className="game-release">
              {formatDate(first_release_date)}
            </Text>
            <Heading as="h3" size="lg" textColor="brand.600">
              Genres:{' '}
            </Heading>
            {genres.map((genre) => (
              <Text
                key={genre.id}
                className="game-genre"
                fontSize="xl"
                textColor="brand.500"
              >
                {genre.name}
              </Text>
            ))}
            <Heading as="h3" size="lg" textColor="brand.600">
              Platforms:{' '}
            </Heading>
            {platforms.map((platform) => (
              <Text
                key={platform.id}
                className="game-genre"
                fontSize="xl"
                textColor="brand.500"
              >
                {platform.name}
              </Text>
            ))}
          </GridItem>
        </Grid>

        <Grid gridTemplateColumns="repeat(3, 1fr)">
          <GridItem colSpan={1}></GridItem>
          <GridItem colSpan={1}>
            <Heading as="h3" size="lg" textColor="brand.600" marginTop="60px">
              Summary:
            </Heading>
            <Text fontSize="xl" textColor="brand.500" className="game-summary">
              {summary}
            </Text>

            <Center>
              {addToBackLogClicked ? (
                <AddGame gameName={gameName} platforms={platforms} />
              ) : (
                <Button
                  onClick={() => setAddToBackLogClicked(true)}
                  marginTop="40px"
                  marginBottom="40px"
                >
                  Add to Backlog
                </Button>
              )}
            </Center>
            <Heading as="h3" size="lg" textColor="brand.600">
              Publishers:{' '}
            </Heading>
            {involved_companies.map((item) => (
              <Text
                key={item.id}
                className="game-company"
                fontSize="xl"
                textColor="brand.500"
              >
                {item.company.name}
              </Text>
            ))}

            <Heading
              as="h3"
              size="lg"
              textColor="brand.500"
              marginTop="40px"
              marginBottom="20px"
            >
              Screenshots:{' '}
            </Heading>
            <SimpleGrid columns={3} spacing={4}>
              {screenshots.map((shot) => (
                <Image
                  key={shot.id}
                  className="game-screenshots"
                  fontSize="xl"
                  textColor="brand.500"
                  src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge_2x/${shot.image_id}.jpg`}
                  alt={`screenshot`}
                ></Image>
              ))}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  )
}
