import './App.css'
import ThreeCanvas from './three/three'
import { AppState, useAppState } from './hooks/UseAppState'
import ControlMenu, { Controls } from './component/ControlMenu/ControlMenu'
import { useState } from 'react'

function App() {
  const { state, controlsChosenDispatch } = useAppState()
  const [controls, setControls] = useState<Controls | undefined>(undefined)
  return (
    <>
      {state === AppState.CONTROL_MENU && (
        <ControlMenu
          controlsChosenCallback={(c) => (
            setControls(c), controlsChosenDispatch()
          )}
        />
      )}
      <ThreeCanvas controls={controls} />
    </>
  )
}

export default App
