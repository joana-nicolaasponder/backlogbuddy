import {
  Heading,
  Text,
  Select,
  FormControl,
  FormLabel,
  Button,
  Center,
  Image,
} from '@chakra-ui/react'

import { buyGame, getBacklogGames } from '../apiClient/games'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function NewGame() {
  const { name } = useParams()
  const [selectedGenre, setSelectedGenre] = useState('')

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

  const { cover } = game[0]

  // const handleSubmit = async (e) => {
  //   console.log('Clicked')
  //   e.preventDefault()
  //   const response = await getBacklogGames()
  //   console.log('recommendation', response)
  //   window.location.href = `/games/recommended/${selectedGenre}`
  // }

  return (
    <>
      <Image
        borderRadius="5px"
        margin="auto 0"
        objectFit="cover"
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${cover.image_id}.jpg`}
        alt={name}
      ></Image>
      <Heading as="h1" size="4xl" color="brand.500">
        WAIT!
      </Heading>
      <Text fontSize="2xl" color="brand.500">
        Before you buy this game...{' '}
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
        <Select
          placeholder="Select Genre"
          marginBottom={2}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
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
          <Link to={`/games/recommended/${selectedGenre}`}>
            <Button>THIS ONE... 😅</Button>
            {/* TODO: Change into handleSubmit. Look at AddGame component for an idea */}
          </Link>
        </Center>
      </FormControl>
    </>
  )
}
