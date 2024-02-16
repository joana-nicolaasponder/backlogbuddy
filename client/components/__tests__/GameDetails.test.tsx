import { describe, it, expect, vi } from 'vitest'
import { setupApp } from '../../tests/setup.tsx'

describe('GameDetails', () => {
  it('shows an image of the game', async () => {
    const screen = setupApp('/games/ooblets')
    const image = await screen.findByAltText("Ooblets cover")
    expect(image).toBeVisible()
  })
  it.todo('shows the name of the game', async () => {
    const screen = setupApp('/game/1')
    const name = await screen.findByText('Game 1')
    expect(name).toBeTruthy()
  })
})
