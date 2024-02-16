import { Link, useParams } from 'react-router-dom'
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
          marginTop="100px"
          as="h1"
          size="xl"
          textColor="brand.500"
          textAlign="center"
          marginBottom="80px"
        >
          {gameName}
        </Heading>
      </GridItem>

      <GridItem colSpan={4}>
        <Grid gridTemplateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <Center>
              <Image
                boxSize="auto"
                objectFit="cover"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${cover.image_id}.jpg`}
                alt={`${gameName} cover`}
              />
            </Center>
          </GridItem>
          <GridItem colSpan={1}>
            <Heading as="h3" size="m" textColor="brand.600" marginTop="25px">
              Released on:
            </Heading>
            <Text fontSize="sm" textColor="brand.500" className="game-release">
              {formatDate(first_release_date)}
            </Text>
            <Heading as="h3" size="m" textColor="brand.600" marginTop="10px">
              Genres:{' '}
            </Heading>
            {genres.map((genre) => (
              <Text
                key={genre.id}
                className="game-genre"
                fontSize="sm"
                textColor="brand.500"
              >
                {genre.name}
              </Text>
            ))}
            <Heading as="h3" size="m" textColor="brand.600" marginTop="10px">
              Platforms:{' '}
            </Heading>
            {platforms.map((platform) => (
              <Text
                key={platform.id}
                className="game-genre"
                fontSize="sm"
                textColor="brand.500"
              >
                {platform.name}
              </Text>
            ))}
            <Heading as="h3" size="m" textColor="brand.600" marginTop="10px">
              Summary:
            </Heading>
            <Text fontSize="sm" textColor="brand.500" className="game-summary">
              {summary}
            </Text>
            <Heading as="h3" size="m" textColor="brand.600" marginTop="10px">
              Publishers:{' '}
            </Heading>
            {involved_companies.map((item) => (
              <Text
                key={item.id}
                className="game-company"
                fontSize="sm"
                textColor="brand.500"
              >
                {item.company.name}
              </Text>
            ))}
          </GridItem>
        </Grid>
        <Center>
          <Link to={`/games/${gameName.toLowerCase()}/add`}>
            <Button marginTop="60px" marginBottom="60px">
              Add to Backlog
            </Button>
          </Link>
        </Center>

        <Grid gridTemplateColumns="repeat(3, 1fr)">
          {/* <GridItem colSpan={1}></GridItem> */}
          <GridItem colSpan={3} marginLeft="60px" marginRight="60px">
            <Heading
              as="h3"
              size="m"
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
