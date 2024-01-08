import {
  Heading,
  Text,
  Select,
  FormControl,
  FormLabel,
  Button,
  Center,
} from '@chakra-ui/react'

import { buyGame } from '../apiClient/games'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function NewGame() {
  const { name } = useParams()

  const {
    data: game,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['game', name],
    queryFn: () => buyGame(name as string),
  })

  if (error) {
    return <p>There was an error trying to get the game details</p>
  }

  if (!game || isLoading) {
    return <p>Loading...</p>
  }

  const { genres } = game[0]

  return (
    <>
      <Heading as="h1" size="4xl" color="brand.500">
        WAIT!
      </Heading>
      <Text fontSize="2xl" color="brand.500">
        Before you buy a game...{' '}
      </Text>
      <Text fontSize="2xl" color="brand.600">
        Why do you want to buy this game?
      </Text>

      <FormControl>
        <Text
          as="p"
          fontSize="2xl"
          marginBottom={2}
          color="brand.700"
          fontStyle="italic"
        >
          Because I feel
        </Text>
        <FormLabel color="brand.700">like playing a...</FormLabel>
        <Select placeholder="Select Genre" marginBottom={2}>
          {genres.map((g) => (
            <option key={g.id}>{g.name}</option>
          ))}
        </Select>
        <Text
          as="p"
          fontSize="2xl"
          marginBottom={2}
          color="brand.700"
          fontStyle="italic"
        >
          Or
        </Text>
        <FormLabel color="brand.700">Mood</FormLabel>
        <Select placeholder="Select Mood" marginBottom={2}>
          <option>Sad</option>
          <option>Bored</option>
          <option>Cozy</option>
          <option>Hype</option>
          <option>Annoyed</option>
        </Select>
        <Center marginTop="50px">
          <Link to={`/games/recommended`}>
            <Button>THIS ONE... 😅</Button>
          </Link>
        </Center>
      </FormControl>
    </>
  )
}
