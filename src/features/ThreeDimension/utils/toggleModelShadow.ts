import * as THREE from 'three';
import { Object3D } from 'three';

export function toggleModelShadow(object: Object3D, isOn: boolean): void {
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      if (isOn) {
        child.castShadow = true;
      } else {
        child.castShadow = false;
      }
    }
  });
}
