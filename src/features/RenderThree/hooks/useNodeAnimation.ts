import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { MathUtils, type Object3D, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { usePressedKeys } from './usePressedKeys.ts';

type TUseNodeAnimation = {
  gltf: GLTF;
  nodeName: string;
  pathParentRef: React.RefObject<Object3D | null>;
  movementSpeed?: number;
  rotationSpeed?: number;
};

export const useNodeAnimation = ({
  gltf,
  nodeName,
  pathParentRef,
  movementSpeed = 2,
  rotationSpeed = 2
}: TUseNodeAnimation) => {
  const nodeRef = useRef<Object3D | null>(null);
  const velocityRef = useRef({ forward: 0, rotation: 0, speed: 0 });
  const velocityUiTimerRef = useRef(0);

  const lastPathPointRef = useRef<Vector3 | null>(null);
  const pathNodeRef = useRef<Object3D | null>(null);
  const [pathPoints, setPathPoints] = useState<Vector3[]>([]);
  const [displaySpeed, setDisplaySpeed] = useState(0);

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

    if (pathNodeRef.current !== node) {
      pathNodeRef.current = node;
      lastPathPointRef.current = null;
      setPathPoints([]);
    }

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

    //cal velocity
    velocityRef.current.speed = Math.abs(velocityRef.current.forward);

    velocityUiTimerRef.current += delta;
    if (velocityUiTimerRef.current >= 0.05) {
      velocityUiTimerRef.current = 0;
      setDisplaySpeed(velocityRef.current.speed);
    }

    const pathParent = pathParentRef.current;
    if (!pathParent || Math.abs(velocityRef.current.forward) < 0.01) return;

    const pathPoint = pathParent.worldToLocal(node.getWorldPosition(new Vector3()));
    const previousPathPoint = lastPathPointRef.current;
    if (previousPathPoint && previousPathPoint.distanceTo(pathPoint) < 0.05) return;

    lastPathPointRef.current = pathPoint;
    setPathPoints((points) => [...points.slice(-299), pathPoint]);
  });

  return {
    pathPoints,
    displaySpeed
  };
};
