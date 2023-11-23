import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
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

  const { name: gameName, cover, summary, genres, release_dates } = game[0]

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem w="100%" h="10" bg="blue.500" />
      <GridItem w="100%" h="10" bg="blue.500" />
      <GridItem w="100%" h="10" bg="blue.500" />
      <GridItem w="100%" h="10" bg="blue.500" />
      <GridItem w="100%" h="10" bg="blue.500" />
    </Grid>
  )
}
