import { describe, it, expect } from 'vitest'
import { setupApp } from '../../tests/setup.tsx'

describe('HomePage component', () => {
  it('should display the main heading', async () => {
    const { findByText } = setupApp('/')
    expect(await findByText('Hello Joana!')).toBeInTheDocument()
  })

  it('should display the subheading', async () => {
    const { findByText } = setupApp('/')
    expect(await findByText('What would you like to do?')).toBeInTheDocument()
  })

  it('renders buttons with the correct text', async () => {
    const { findByRole } = setupApp('/')
    const addButton = await findByRole('button', { name: 'Add a game' })
    const buyButton = await findByRole('button', {
      name: 'Oh no, I want to buy a game',
    })
    const backlogButton = await findByRole('button', { name: 'Backlog' })
    expect(addButton).toBeInTheDocument()
    expect(buyButton).toBeInTheDocument()
    expect(backlogButton).toBeInTheDocument()
  })
})
