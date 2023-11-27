import { Button, Center, Container, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <>
      <Container>
        <Center>
          <Heading as="h1" size="4xl">
            Hello Joana!
          </Heading>
        </Center>
        <Center>
          <Text fontSize="3xl" marginBottom="20px" marginTop="20px">
            What would you like to do?
          </Text>
        </Center>
        <Center>
          <Link to="/games/search">
            <Button marginRight="20px">Add a game</Button>
          </Link>
          {/* <Button>Buy a game</Button> */}
        </Center>
      </Container>
    </>
  )
}
