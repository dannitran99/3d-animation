import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { MathUtils, type Object3D } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { usePressedKeys } from './usePressedKeys.ts';

type TUseNodeAnimation = {
  gltf: GLTF;
  nodeName: string;
  movementSpeed?: number;
  rotationSpeed?: number;
};

export const useNodeAnimation = ({
  gltf,
  nodeName,
  movementSpeed = 2,
  rotationSpeed = 2
}: TUseNodeAnimation) => {
  const nodeRef = useRef<Object3D | null>(null);
  const velocityRef = useRef({ forward: 0, rotation: 0 });

  const pressedKeysRef = usePressedKeys({
    keys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
  });

  useEffect(() => {
    const node = gltf.scene.getObjectByName(nodeName);
    if (!node) {
      return;
    }

    nodeRef.current = node;

    return () => {
      nodeRef.current = null;
    };
  }, [gltf, nodeName]);

  useFrame((_, delta) => {
    const node = nodeRef.current;
    if (!node) return;

    const pressedKeys = pressedKeysRef.current;

    const forwardTarget = pressedKeys.has('ArrowUp')
      ? -movementSpeed
      : pressedKeys.has('ArrowDown')
        ? movementSpeed
        : 0;
    const rotationTarget = pressedKeys.has('ArrowLeft')
      ? rotationSpeed
      : pressedKeys.has('ArrowRight')
        ? -rotationSpeed
        : 0;
    const lerpFactor = 1 - Math.exp(-8 * delta);

    velocityRef.current.forward = MathUtils.lerp(
      velocityRef.current.forward,
      forwardTarget,
      lerpFactor
    );
    velocityRef.current.rotation = MathUtils.lerp(
      velocityRef.current.rotation,
      rotationTarget,
      lerpFactor
    );

    node.rotation.y += velocityRef.current.rotation * delta;
    node.translateZ(velocityRef.current.forward * delta);
  });
};
