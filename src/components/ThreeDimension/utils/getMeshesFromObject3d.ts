import { Object3D } from 'three';
import * as THREE from 'three';

export function getMeshesFromObject3d(object: Object3D): Array<THREE.Mesh> {
  if ((object as THREE.Mesh).isMesh) {
    return [object as THREE.Mesh];
  }
  const meshes: Array<THREE.Mesh> = [];
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      meshes.push(child as THREE.Mesh);
    }
  });
  return meshes;
}
