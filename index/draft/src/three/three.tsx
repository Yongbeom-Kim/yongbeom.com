import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PointerLockControls, PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { PointerLockControls as PointerLockControlsType } from 'three/addons/controls/PointerLockControls'

type ThreeCanvasProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export default function ThreeCanvas({ className, ...props }: ThreeCanvasProps) {
  const gltf = useLoader(GLTFLoader, '/models/scene.gltf')

  return (
    <div className={classNames('w-screen h-screen', className)} {...props}>
      <Canvas shadows={true}>
        <primitive
          object={gltf.scene}
          position={[0, 0, 0]}
          children-0-castShadow
        />
        <Camera />
        <FloorMesh />
        <BoxMesh position={new THREE.Vector3(0, 1, 0)} size={2} />
        <BoxMesh position={new THREE.Vector3(3, 0.25, 0)} size={0.5} />
        <ambientLight intensity={0.2} />
        <spotLight intensity={7} position={[0, 5, 0]} />
        <directionalLight
          intensity={0.1}
          position={[0, 4, -4]}
          castShadow={true}
        />
      </Canvas>
    </div>
  )
}

function Camera() {
  const controls = useRef<PointerLockControlsType | null>(null)

  const cameraPosition = new THREE.Vector3(0, 2, 0)
  const cameraOrbitPosition = new THREE.Vector3(0, 3, 0)

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  useFrame(() => {
    if (!controls.current) {
      return
    }

    const moveSpeed = 0.07

    let x_delta = 0
    let z_delta = 0

    if (moveForward) {
      x_delta += moveSpeed
    }
    if (moveBackward) {
      x_delta -= moveSpeed
    }
    if (moveLeft) {
      z_delta -= moveSpeed
    }
    if (moveRight) {
      z_delta += moveSpeed
    }

    controls.current.moveForward(x_delta)
    controls.current.moveRight(z_delta)
  })

  const onKeyDown = (event: KeyboardEvent) => {
    console.log(controls.current.getObject().position)
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

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <>
      <PerspectiveCamera position={cameraPosition} />
      <PointerLockControls ref={controls} />
    </>
  )
}

function BoxMesh({
  position,
  size,
}: {
  position: THREE.Vector3
  size: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={position} castShadow={true}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function FloorMesh() {
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow={true}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial />
      </mesh>
    </>
  )
}
