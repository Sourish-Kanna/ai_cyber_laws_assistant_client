import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Calendar } from './components/ui/calendar'
import Layout from './pages/layout'
import { Checkbox } from '@radix-ui/react-checkbox'
function App() {

  return (
    <>
      <Layout/>
      <Checkbox />
    </>
  )
}

export default App
