import { Outlet } from 'react-router-dom'
import { Center, Flex, Spacer } from '@chakra-ui/react'
import Nav from './Nav'

export default function Layout() {
  return (
    <>
      <Nav />
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
