import { Outlet } from 'react-router-dom'
import { Center, Flex, Heading, Spacer } from '@chakra-ui/react'

export default function Layout() {
  return (
    <>
      {/* <Heading align="center" as="h3" bg="brand.900">
        <h1>Too long didn&apos;t play</h1>
      </Heading> */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        color="brand.600"
        bg="brand.900"
      >
        <Spacer />
        <Center marginBottom={4}>
          <main>
            <Outlet />
          </main>
        </Center>
        <Spacer />
        <footer>Copyright &copy; wonderponder</footer>
      </Flex>
    </>
  )
}
