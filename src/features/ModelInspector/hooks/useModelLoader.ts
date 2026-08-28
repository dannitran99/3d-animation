import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import type { Group } from 'three';
import * as THREE from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { useThreeDToolsContext } from '../providers/ThreeDToolsProvider';

type TUseModelLoaderProps = {
  url: string;
  hasAnimations: boolean;
  progressCallback: (progress: ProgressEvent) => void;
};

type TUseModelLoaderReturn = {
  model: Group | THREE.Object3D<THREE.Object3DEventMap> | THREE.AnimationObjectGroup | undefined;
};

export const useModelLoader = ({
  url,
  hasAnimations,
  progressCallback
}: TUseModelLoaderProps): TUseModelLoaderReturn => {
  const { setAnimations, setModelPlaying } = useThreeDToolsContext();

  // giải phóng cahe của GLTFLoader khi component unmount hoặc url thay đổi
  useEffect(() => {
    return () => useLoader.clear(GLTFLoader, url);
  }, [url]);

  const object = useLoader(GLTFLoader, url, undefined, progressCallback);

  useEffect(() => {
    if (hasAnimations) {
      const { animations } = object;
      setAnimations(animations);
    }
    setModelPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimations, object, setAnimations]);

  return {
    model: (object as GLTF).scene
  };
};
