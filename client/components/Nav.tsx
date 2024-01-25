import {
  Box,
  
  Grid,
  GridItem,
  
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { LiaHomeSolid } from 'react-icons/lia'
import { GrGamepad } from 'react-icons/gr'
import { PiPlusCircle } from 'react-icons/pi'

export default function Nav() {
  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)" bg="brand.200">
      <GridItem colSpan={1}>
        <Link to={'/'}>
          <Box margin="10px 10px 10px 10px" p="2">
            <LiaHomeSolid size={50}></LiaHomeSolid>
          </Box>
        </Link>
      </GridItem>
      <GridItem colSpan={1}>
        <Link to={'/games/backlog'}>
          <Box margin="10px 10px 10px 10px" p="2">
            <GrGamepad size={50} />
          </Box>
        </Link>
      </GridItem>
      <GridItem colSpan={1}>
        <Link to={'/games/buy'}>
          <Box margin="10px 10px 10px 10px" p="2">
            <PiPlusCircle size={50} />
          </Box>
        </Link>
      </GridItem>
    </Grid>
  )
}
