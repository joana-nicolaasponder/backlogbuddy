import {
  Box,
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { viewGame } from '../apiClient/games'

export default function BacklogDetails() {
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
    return <Center>Error fetching game details. Please try again later.</Center>
  }

  if (isLoading || !game) {
    return <Center>Loading game details...</Center>
  }

  const {
    name: gameName,
    cover,
    genres,
    first_release_date,
    platforms,
    involved_companies,
    screenshots,
    summary,
    storyline,
  } = game[0]

  return (
    <Container maxW="container.xl">
      <VStack spacing={8}>
        <Heading
          marginTop="20px"
          as="h1"
          size="2xl"
          color={useColorModeValue('brand.500', 'brand.200')}
          textAlign="center"
        >
          {gameName}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Image
              boxSize="500px"
              objectFit="contain"
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${cover.image_id}.jpg`}
              alt={`${gameName} cover`}
              borderRadius="lg"
            />
          </Box>

          <Stack spacing={4}>
            <Text fontSize="lg">Added on: 12/02/2024</Text>
            <Text fontSize="lg">Playtime: 200hrs</Text>
            <Text fontSize="lg">How long to beat: infinite time</Text>
            <Text fontSize="lg" color="green.500">
              Status: Playing
            </Text>
            <Text fontSize="lg">Mood: Hype</Text>
            <Text fontSize="lg">Notes: This game is so much fun</Text>
            <Text fontSize="lg">Platform I own it on: Nintendo</Text>
          </Stack>
        </SimpleGrid>

        <Box w="full">
          <Heading
            as="h3"
            size="lg"
            color={useColorModeValue('brand.600', 'brand.300')}
            mb={4}
          >
            Summary
          </Heading>
          <Text fontSize="md">{summary}</Text>

          <Heading
            as="h3"
            size="lg"
            color={useColorModeValue('brand.600', 'brand.300')}
            mt={6}
            mb={4}
          >
            Publishers
          </Heading>
          {involved_companies.map((item) => (
            <Text key={item.id} fontSize="md">
              {item.company.name}
            </Text>
          ))}

          <Heading as="h3" size="lg" mt={6} mb={4}>
            Screenshots
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {screenshots.map((shot) => (
              <Image
                key={shot.id}
                src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge_2x/${shot.image_id}.jpg`}
                alt="screenshot"
                borderRadius="lg"
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  )
}
