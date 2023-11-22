import { Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import GameDetails from './components/GameList'
import TestComponent from './components/GameDetails'
import BuyGame from './components/BuyGame'
import HomePage from './components/Homepage'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="games/search" element={<GameDetails />} />
    <Route path="games/buy" element={<BuyGame />} />
    <Route path="games/:name" element={<TestComponent />} />
  </Route>
)
