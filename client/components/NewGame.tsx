import {
  Center,
  Heading,
  Text,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import games from '../../server/routes/games'

export default function NewGame() {
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
        {/* <Select placeholder="Select Genre" marginBottom={2}>
          {games.map((g) => (
            <option key={g.id}>{g.name}</option>
          ))}
        </Select> */}
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
        </Select>
      </FormControl>
    </>
  )
}
