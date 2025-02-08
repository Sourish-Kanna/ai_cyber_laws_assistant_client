import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='font-bold'>Hello</h1>
      <Button variant='destructive'>Suthakar</Button>
    </>
  )
}

export default App
