export default function Homepage() {
  function handleClick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <h1>Hello Joana!</h1>
      <h2>What would you like to do?</h2>
      <button onClick={handleClick}>Add a game</button>
      <button>Buy a game</button>
    </>
  )
}
