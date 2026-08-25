import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// clears the GLTFLoader cache on unmount/src change so leaving the page
// actually frees the model instead of leaking a stale cached reference
export const useGltfModel = (src: string): GLTF => {
  useEffect(() => {
    return () => useLoader.clear(GLTFLoader, src);
  }, [src]);

  return useLoader(GLTFLoader, src) as GLTF;
};
