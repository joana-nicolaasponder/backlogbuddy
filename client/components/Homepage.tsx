import { Button, VStack, Box, Heading, Text, LinkBox } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <Box maxW="container.md" mx="auto" p={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" color="brand.900">
          Hello Joana!
        </Heading>
        <Text fontSize="xl" textAlign="center" color="brand.700">
          What would you like to do?
        </Text>
        <VStack spacing={4}>
          <LinkBox>
            <Link to="/games/search">
              <Button
                bg="brand.800"
                color="brand.100"
                w="full"
                size="lg"
                _hover={{ bg: 'brand.700' }}
              >
                Add a game
              </Button>
            </Link>
          </LinkBox>
          <LinkBox>
            <Link to="/games/buy">
              <Button
                bg="brand.800"
                color="brand.100"
                w="full"
                size="lg"
                _hover={{ bg: 'brand.700' }}
              >
                Oh no, I want to buy a game
              </Button>
            </Link>
          </LinkBox>
          <LinkBox>
            <Link to="/games/backlog">
              <Button
                bg="brand.800"
                color="brand.100"
                w="full"
                size="lg"
                _hover={{ bg: 'brand.700' }}
              >
                Backlog
              </Button>
            </Link>
          </LinkBox>
        </VStack>
      </VStack>
    </Box>
  )
}
