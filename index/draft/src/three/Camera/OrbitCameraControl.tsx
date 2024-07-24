import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
// @ts-expect-error I don't know why this does not work, but I can't get this to work.
import { OrbitControls as OrbitControlsType } from 'three/addons/controls/OrbitsControls'
import * as THREE from 'three'
import { getCameraCollisionNormal } from '../../utils/three/CameraCollision'

type OrbitCameraControlProps = {
  enableKeyboardMovement: boolean
  movementSpeed: number
  initialCameraPosition: THREE.Vector3
  touchControlIds: {
    forward: string
    backward: string
    left: string
    right: string
  }
}
export function OrbitCameraControl({
  enableKeyboardMovement,
  movementSpeed,
  initialCameraPosition,
  touchControlIds,
}: OrbitCameraControlProps) {
  const controls = useRef<OrbitControlsType | null>(null)
  const initialOrbitTargetPosition = initialCameraPosition
    .clone()
    .subScalar(0.1)

  const { animate: animateMovement } = useMovement(
    enableKeyboardMovement,
    movementSpeed,
    touchControlIds
  )

  useFrame(({ scene }) => {
    if (controls.current === null) {
      return
    }
    animateMovement(controls.current, scene)
  })

  useEffect(() => {
    if (controls.current === null) {
      return
    }
    controls.current.object.position.set(
      initialCameraPosition.x,
      initialCameraPosition.y,
      initialCameraPosition.z
    )
    controls.current.target.set(
      initialOrbitTargetPosition.x,
      initialOrbitTargetPosition.y,
      initialOrbitTargetPosition.z
    )
    controls.current.update()
  }, [])
  return (
    <>
      <PerspectiveCamera position={initialCameraPosition} />
      <OrbitControls
        ref={controls}
        reverseOrbit={true}
        rotateSpeed={0.6}
        // panSpeed={-1}
        // target={new THREE.Vector3(0, initialCameraPosition.y, 0)} This gives a bunch of issues
      />
    </>
  )
}

function useMovement(
  enableKeyboardMovement: boolean,
  movementSpeed: number,
  touchControlIds: {
    forward: string
    backward: string
    left: string
    right: string
  }
) {
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  const holdEvents = ['mousedown', 'touchstart']
  const releaseEvents = ['mouseup', 'touchend']

  const keyboardToSetMove: [
    string,
    React.Dispatch<React.SetStateAction<boolean>>,
  ][] = [
    ['w', setMoveForward],
    ['s', setMoveBackward],
    ['a', setMoveLeft],
    ['d', setMoveRight],
  ]

  const setupButtons = () => {
    const touchControls = Object.fromEntries(
      Object.entries(touchControlIds).map(([key, value]) => [
        key,
        document.getElementById(value) as HTMLButtonElement,
      ])
    )

    const {
      forward: forwardButton,
      backward: backwardButton,
      left: leftButton,
      right: rightButton,
    } = touchControls

    const buttonToSetMove: [
      HTMLButtonElement,
      React.Dispatch<React.SetStateAction<boolean>>,
    ][] = [
      [forwardButton, setMoveForward],
      [backwardButton, setMoveBackward],
      [leftButton, setMoveLeft],
      [rightButton, setMoveRight],
    ]
    buttonToSetMove.forEach(([button, setMove]) => {
      holdEvents.forEach((event) => {
        button.addEventListener(event, () => setMove(true))
      })
      releaseEvents.forEach((event) => {
        button.addEventListener(event, () => setMove(false))
      })
    })
  }

  const teardownButtons = () => {
    const touchControls = Object.fromEntries(
      Object.entries(touchControlIds).map(([key, value]) => [
        key,
        document.getElementById(value) as HTMLButtonElement,
      ])
    )

    const {
      forward: forwardButton,
      backward: backwardButton,
      left: leftButton,
      right: rightButton,
    } = touchControls

    const buttonToSetMove: [
      HTMLButtonElement,
      React.Dispatch<React.SetStateAction<boolean>>,
    ][] = [
      [forwardButton, setMoveForward],
      [backwardButton, setMoveBackward],
      [leftButton, setMoveLeft],
      [rightButton, setMoveRight],
    ]
    buttonToSetMove.forEach(([button, setMove]) => {
      holdEvents.forEach((event) => {
        button.removeEventListener(event, () => setMove(true))
      })
      releaseEvents.forEach((event) => {
        button.removeEventListener(event, () => setMove(false))
      })
    })
  }

  useEffect(() => {
    setupButtons()
    if (enableKeyboardMovement) {
      keyboardToSetMove.forEach(([key, setMove]) => {
        // TODO: Move this to separate function
        window.addEventListener('keydown', (event) => {
          if (event.key === key) {
            setMove(true)
          }
        })
        window.addEventListener('keyup', (event) => {
          if (event.key === key) {
            setMove(false)
          }
        })
      })
    }

    return () => {
      teardownButtons()
      if (enableKeyboardMovement) {
        keyboardToSetMove.forEach(([key, setMove]) => {
          // TODO: Move this to separate function
          window.removeEventListener('keydown', (event) => {
            if (event.key === key) {
              setMove(true)
            }
          })
          window.removeEventListener('keyup', (event) => {
            if (event.key === key) {
              setMove(false)
            }
          })
        })
      }
    }
  }, [])

  const animate = (controls: OrbitControlsType, scene: THREE.Scene) => {
    const delta = new THREE.Vector3()
    delta.z = Number(moveBackward) - Number(moveForward)
    delta.x = Number(moveRight) - Number(moveLeft)
    const horizontalRotation: THREE.Euler = controls.object.rotation.clone()
    delta.applyEuler(horizontalRotation)
    delta.y = 0

    const collisionNormal = getCameraCollisionNormal(
      controls.object as THREE.Camera,
      scene.children
    )
    if (collisionNormal.x !== 0 || collisionNormal.z !== 0) {
      delta.copy(collisionNormal)
    }
    delta.normalize()
    delta.multiplyScalar(movementSpeed)

    const camera = controls.object as THREE.Camera
    camera.position.add(delta)
    controls.target.add(delta)
    controls.update()
  }
  return { animate }
}
