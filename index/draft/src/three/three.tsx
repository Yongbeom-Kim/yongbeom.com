import { Canvas, useLoader } from '@react-three/fiber'
import classNames from 'classnames'
import { useRef } from 'react'
import * as THREE from 'three'
// @ts-expect-error I don't know why this does not work, but I can't get this to work.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { PointerLockCameraControl } from './Camera/PointerLockCameraControl'
import { OrbitCameraControl } from './Camera/OrbitCameraControl'
import TouchControls from '../component/TouchControls/TouchControls'

type ThreeCanvasProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export default function ThreeCanvas({ className, ...props }: ThreeCanvasProps) {
  const gltf = useLoader(GLTFLoader, '/models/scene.gltf')
  const initialCameraPosition = new THREE.Vector3(2, 2, 2)

  const forward = 'forward-button'
  const backward = 'backward-button'
  const left = 'left-button'
  const right = 'right-button'

  const touch = true // TODO: Implement menu between touch and keyboard controls
  return (
    <div className={classNames('fixed inset-0', className)} {...props}>
      {touch && (
        <TouchControls
          forward={forward}
          backward={backward}
          left={left}
          right={right}
        />
      )}
      <Canvas shadows={true} className="absolute inset-0">
        <primitive
          object={gltf.scene}
          position={[0, 0, 0]}
          children-0-castShadow
        />
        {touch ? (
          <OrbitCameraControl
            enableKeyboardMovement
            movementSpeed={0.15}
            initialCameraPosition={initialCameraPosition}
            touchControlIds={{
              forward,
              backward,
              left,
              right,
            }}
          />
        ) : (
          <PointerLockCameraControl
            initialCameraPosition={initialCameraPosition}
          />
        )}

        {/* <FloorMesh /> */}
        <BoxMesh position={new THREE.Vector3(0, 1, 0)} size={2} />
        <BoxMesh position={new THREE.Vector3(3, 0.25, 0)} size={0.5} />
        <ambientLight intensity={0.2} />
        {/* <spotLight intensity={7} position={[0, 5, 0]} /> */}
        <directionalLight intensity={0.1} position={[0, 4, -4]} />
        <directionalLight intensity={0.1} position={[0, 4, 4]} color={'blue'} />
        <directionalLight intensity={0.1} position={[0, 4, -4]} color={'red'} />
        <directionalLight
          intensity={0.1}
          position={[4, 4, 0]}
          color={'green'}
        />
        <directionalLight
          intensity={0.1}
          position={[-4, 4, 0]}
          color={'purple'}
        />
      </Canvas>
    </div>
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
