import { useState } from 'react'
import DarkModeButton from './components/DarkModeButton/DarkModeButton'

function App() {

  return (
    <div className='h-screen w-screen bg-gradient-to-tr dark:from-black dark:to-blue-950 from-white to-blue-100'>
      <DarkModeButton />
    </div>
  )
}

export default App
