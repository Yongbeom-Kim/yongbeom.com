import * as THREE from 'three'

const raycasters = [...Array(8).keys()].map(() => new THREE.Raycaster())
const origin = new THREE.Vector3()

/**
 * Get the normal of the face of the object that the camera is colliding with.
 * If the camera is not colliding with any object, return a zero vector.
 *
 * @param camera Camera to check collision with
 * @param collisionObjects Objects to check collision with
 * @returns Normal of the face of the object that the camera is colliding with
 */
export function getCameraCollisionNormal(
  camera: THREE.Camera,
  collisionObjects: THREE.Object3D[]
) {
  origin.copy(camera.position)
  const direction = new THREE.Vector3(0, 0, 1)

  for (let i = 0; i < raycasters.length; i++) {
    const raycaster = raycasters[i]
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), (i * Math.PI) / 4)
    raycaster.set(origin, direction.clone())
  }

  for (let i = 0; i < raycasters.length; i++) {
    const ray = raycasters[i]
    const intersection = ray.intersectObjects(collisionObjects)[0]
    if (intersection !== undefined && intersection.distance < 1) {
      return intersection.face?.normal ?? new THREE.Vector3(0, 0, 0)
    }
  }

  return new THREE.Vector3(0, 0, 0)
}
