import {
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { viewBacklogGame } from '../apiClient/games'

export default function BacklogDetails() {
  const { name } = useParams()
  const [editableStatus, setEditableStatus] = useState('')
  const [editableNotes, setEditableNotes] = useState('')
  const [editableMood, setEditableMood] = useState('')

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

  // Update this function to handle saving the changes
  const handleSaveChanges = () => {
    // Call an API to update the game details or update state
    console.log('Save changes', {
      status: editableStatus,
      notes: editableNotes,
      mood: editableMood,
    })
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <GridItem colSpan={12}>
        <Heading as="h1" size="4xl" textAlign="center" my="40px">
          {game_title}
        </Heading>
      </GridItem>

      <GridItem colSpan={[12, 12, 4]} p={5}>
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${image}.jpg`}
          alt={`${game_title} cover`}
        />
      </GridItem>

      <GridItem colSpan={[12, 12, 8]} p={5}>
        <FormControl mb={4}>
          <FormLabel>Status:</FormLabel>
          <Select
            placeholder="Select status"
            onChange={(e) => setEditableStatus(e.target.value)}
            defaultValue={status}
          >
            {/* Replace with actual status options */}
            <option value="Planning">Planning</option>
            <option value="Playing">Playing</option>
            <option value="Completed">Completed</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Notes:</FormLabel>
          <Textarea
            placeholder="Your notes"
            onChange={(e) => setEditableNotes(e.target.value)}
            defaultValue="This game is so much fun"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Mood:</FormLabel>
          <Flex>
            <Select
              placeholder="Select mood"
              onChange={(e) => setEditableMood(e.target.value)}
              defaultValue={mood}
            >
              {/* Replace with actual mood options */}
              <option value="Excited">Excited</option>
              <option value="Relaxed">Relaxed</option>
            </Select>
            <Input
              placeholder="Custom mood"
              ml={2}
              onChange={(e) => setEditableMood(e.target.value)}
            />
          </Flex>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </GridItem>
      {/* ... other GridItem components for displaying the rest of the game details ... */}
    </Grid>
  )
}
