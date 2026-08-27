import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { AnimationMixer } from 'three';

import type { TUseModelAnimation } from '../type';

export const useModelAnimation = ({ gltf }: TUseModelAnimation) => {
  const mixerRef = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations.length > 0) {
      const mixer = new AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [gltf]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });
};
