import { Canvas } from '@react-three/fiber'
import classNames from 'classnames'
import { useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

type ThreeCanvasProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export default function ThreeCanvas({ className, ...props }: ThreeCanvasProps) {
  const cameraPosition = new THREE.Vector3(14, 5, 14)
  const cameraOrbitPosition = new THREE.Vector3(0, 3, 0)
  const cameraAngle = Math.atan2(
    cameraPosition.y - cameraOrbitPosition.y,
    Math.sqrt(
      (cameraPosition.x - cameraOrbitPosition.x) ** 2 +
        (cameraPosition.z - cameraOrbitPosition.z) ** 2
    )
  )

  return (
    <div className={classNames('w-screen h-screen', className)} {...props}>
      <Canvas shadows={true}>
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          rotation={[0, 0, 1]}
        />
        <OrbitControls
          maxPolarAngle={Math.PI / 2 - cameraAngle}
          minPolarAngle={Math.PI / 2 - cameraAngle}
          target={cameraOrbitPosition}
          enablePan={false}
        />
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
