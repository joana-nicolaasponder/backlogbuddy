import { Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
export default function Success() {
  return (
    <>
      <Heading>Success!</Heading>
      <Link to="/">Home</Link>
    </>
  )
}
