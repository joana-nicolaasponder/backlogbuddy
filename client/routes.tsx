import { Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import GameDetails from './components/GameDetails'
import GameList from './components/GameList'
import BuyGame from './components/BuyGame'
import HomePage from './components/Homepage'

import NewGame from './components/NewGame'
import Backlog from './components/Backlog'
import Recommendation from './components/Recommendation'
import AddGame from './components/AddGame'
import Success from './components/Success'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="games/search" element={<GameList />} />
    <Route path="games/buy" element={<BuyGame />} />
    <Route path="games/:name" element={<GameDetails />} />
    <Route path="games/:name/add" element={<AddGame />} />
    <Route path="games/buy/:name" element={<NewGame />} />
    <Route path="games/backlog" element={<Backlog />} />
    <Route path="games/recommended" element={<Recommendation />} />
    <Route path="games/success" element={<Success />} />
  </Route>
)
