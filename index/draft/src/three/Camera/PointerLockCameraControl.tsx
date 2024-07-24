import * as THREE from 'three'
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
// @ts-expect-error I don't know why this does not work, but I can't get this to work.
import { PointerLockControls as PointerLockControlsType } from 'three/addons/controls/PointerLockControls'
import { getCameraCollisionNormal } from '../../utils/three/CameraCollision'

type PointerLockCameraControlType = {
  initialCameraPosition: THREE.Vector3
}

export function PointerLockCameraControl({
  initialCameraPosition,
}: PointerLockCameraControlType) {
  const controls = useRef<PointerLockControlsType | null>(null)

  const keyboardMovementAnimateCallback = useKeyboardMovement({
    controls,
    initialCameraPosition,
  })

  useFrame(({ scene }) => {
    if (controls.current === null) {
      return
    }
    keyboardMovementAnimateCallback(controls, scene)
  })

  return (
    <>
      <PerspectiveCamera position={initialCameraPosition} />
      <PointerLockControls ref={controls} />
    </>
  )
}

function useKeyboardMovement({
  controls,
  initialCameraPosition,
}: {
  controls: React.MutableRefObject<PointerLockControlsType | null>
  initialCameraPosition: THREE.Vector3
}) {
  const moveSpeed = 0.07 // Speed of movement

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'w':
        setMoveForward(true)
        break
      case 's':
        setMoveBackward(true)
        break
      case 'a':
        setMoveLeft(true)
        break
      case 'd':
        setMoveRight(true)
        break
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'w':
        setMoveForward(false)
        break
      case 's':
        setMoveBackward(false)
        break
      case 'a':
        setMoveLeft(false)
        break
      case 'd':
        setMoveRight(false)
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    controls.current.camera.position.y = initialCameraPosition.y
    new THREE.Raycaster()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const animate = (
    controls: React.MutableRefObject<PointerLockControlsType | null>,
    scene: THREE.Scene
  ) => {
    if (controls.current === null) {
      return
    }
    const direction = new THREE.Vector3()
    direction.set(0, 0, 0)

    direction.z += Number(moveForward)
    direction.z -= Number(moveBackward)
    direction.x -= Number(moveLeft)
    direction.x += Number(moveRight)

    const intersectNormalVector = getCameraCollisionNormal(
      controls.current.camera,
      scene.children // TODO: room for optimisation
    )

    if (intersectNormalVector.x == 0 && intersectNormalVector.z == 0) {
      controls.current.moveForward(direction.z * moveSpeed)
      controls.current.moveRight(direction.x * moveSpeed)
    } else {
      controls.current.camera.position.add(
        intersectNormalVector.multiplyScalar(moveSpeed)
      )
    }
  }
  return animate
}
