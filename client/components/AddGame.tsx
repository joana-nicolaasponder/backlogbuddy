import { Button, FormControl, FormLabel, Select, Text } from '@chakra-ui/react'

import { useState } from 'react'
import { addGame, addBacklogGame } from '../apiClient/games'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function AddGame() {
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [selectedReason, setSelectedReason] = useState('')

  const { name } = useParams()

  const {
    data: game,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['game', name],
    queryFn: () => addGame(name as string),
  })

  if (error) {
    return <p>There was an error</p>
  }

  if (!game || isLoading) {
    return <p>Loading...</p>
  }

  const {
    name: gameName,
    genres,
    platforms,
    cover,
    involved_companies,
  } = game[0]

  const genreString = genres.map((genre) => genre.name).join(', ')
  const publisherString = involved_companies
    .map((company) => company.company.name)
    .join(', ')

  const handleSubmit = async (e) => {
    console.log('CLicked')
    e.preventDefault()
    const response = await addBacklogGame({
      game_title: gameName,
      platform: selectedPlatform,
      image: cover.image_id,
      genre: genreString,
      publisher: publisherString,
      mood: selectedReason,
    })
    console.log('Game added', response)
  }

  return (
    <>
      <FormControl margin={10}>
        <Text
          as="p"
          fontSize="2xl"
          marginBottom={2}
          color="brand.700"
          fontStyle="italic"
        >
          Adding <span style={{ backgroundColor: 'pink' }}>{gameName}</span> to
          your backlog
        </Text>

        <FormLabel color="brand.700">What platform do you own it on?</FormLabel>
        <Select
          placeholder="Select platform"
          marginBottom={2}
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.name}>
              {platform.name}
            </option>
          ))}
        </Select>
        <FormLabel color="brand.700">Why did you buy it?</FormLabel>
        <Select
          placeholder="Select mood/reason"
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
        >
          <option>Hype</option>
          <option>I was bored</option>
          <option>Wanted to play this genre</option>
        </Select>
        <Button mt={4} colorScheme="pink" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>
    </>
  )
}
