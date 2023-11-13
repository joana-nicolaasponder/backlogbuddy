// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { setupApp } from './setup.tsx'

describe('Homepage', () => {
  it.todo('shows the user name', async () => {
    const screen = setupApp('/')
    const name = await screen.findByText('Joana')
    expect(name).toEqual('Joana')
  })
  it.todo('shows the currently played game', async () => {})
  it.todo(
    'shows a search bar to search for games in the database',
    async () => {}
  )
  it.todo('shows an option to add a game to the database', async () => {})
  it.todo('shows a list of games in the database', async () => {})
})
