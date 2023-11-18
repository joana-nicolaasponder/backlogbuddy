import { Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import FrogPage from './components/FrogPage'
import GameDetails from './components/GameList'
import TestComponent from './components/GameDetails'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<GameDetails />} />
    <Route path="games/:name" element={<TestComponent />} />
  </Route>
)
