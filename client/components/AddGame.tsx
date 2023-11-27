import { Button, FormControl, FormLabel, Select, Text } from '@chakra-ui/react'

import { useState } from 'react'

export default function AddGame({ gameName, platforms }) {
  const [selectedPlatform, setSelectedPlatform] = useState('')

  const handleSubmit = () => {
    //add game to database
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
        <Select placeholder="Select mood/reason">
          <option>Hype</option>
          <option>I was bored</option>
          <option>Wanted to play this genre</option>
        </Select>
        <Button mt={4} colorScheme="pink" type="submit" onSubmit={handleSubmit}>
          Submit
        </Button>
      </FormControl>
    </>
  )
}
