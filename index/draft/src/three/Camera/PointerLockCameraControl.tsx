import * as THREE from 'three'
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { PointerLockControls as PointerLockControlsType } from 'three/addons/controls/PointerLockControls'

export function PointerLockCameraControl() {
  const controls = useRef<PointerLockControlsType | null>(null)
  const cameraPosition = new THREE.Vector3(0, 2, 0)

  const keyboardMovementAnimateCallback = useKeyboardMovement({
    controls,
    cameraPosition,
  })

  useFrame(({ scene }) => {
    if (controls.current === null) {
      return
    }
    keyboardMovementAnimateCallback(controls, scene)
  })

  return (
    <>
      <PerspectiveCamera position={cameraPosition} />
      <PointerLockControls ref={controls} />
    </>
  )
}

function useKeyboardMovement({
  controls,
  cameraPosition,
}: {
  controls: React.MutableRefObject<PointerLockControlsType | null>
  cameraPosition: THREE.Vector3
}) {
  const moveSpeed = 0.07 // Speed of movement

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  const hasCollision = useCollisionDetection()

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
    controls.current.camera.position.y = cameraPosition.y
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

    const intersectNormalVector = hasCollision(controls.current, scene)

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

function useCollisionDetection() {
  const raycasters = [...Array(8).keys()].map(() => new THREE.Raycaster())
  const origin = new THREE.Vector3()

  const hasCollision = (
    controls: PointerLockControlsType,
    scene: THREE.Scene
  ) => {
    origin.copy(controls.getObject().position)
    const direction = new THREE.Vector3(0, 0, 1)

    for (let i = 0; i < raycasters.length; i++) {
      const raycaster = raycasters[i]
      direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), (i * Math.PI) / 4)
      raycaster.set(origin, direction.clone())
    }

    for (let i = 0; i < raycasters.length; i++) {
      const ray = raycasters[i]
      const intersection = ray.intersectObjects(scene.children)[0]
      if (intersection !== undefined && intersection.distance < 1) {
        return intersection.face?.normal ?? new THREE.Vector3(0, 0, 0)
      }
    }

    return new THREE.Vector3(0, 0, 0)
  }

  return hasCollision
}