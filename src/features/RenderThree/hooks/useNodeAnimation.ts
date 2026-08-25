import { useEffect, useRef } from 'react';
import type { Object3D } from 'three';

import type { TUseNodeAnimation } from '../type';

import { useRobotMovement } from './useRobotMovement';
import { useRobotPathTrail } from './useRobotPathTrail';

// orchestrates robot movement + path trail recording for a named gltf node
export const useNodeAnimation = ({
  gltf,
  nodeName,
  pathParentRef,
  movementSpeed,
  rotationSpeed
}: TUseNodeAnimation) => {
  const nodeRef = useRef<Object3D | null>(null);

  useEffect(() => {
    nodeRef.current = nodeName ? (gltf.scene.getObjectByName(nodeName) ?? null) : null;

    return () => {
      nodeRef.current = null;
    };
  }, [gltf, nodeName]);

  const { speedRef, displaySpeed } = useRobotMovement({ nodeRef, movementSpeed, rotationSpeed });
  const pathPoints = useRobotPathTrail({ nodeRef, pathParentRef, speedRef });

  return { pathPoints, displaySpeed };
};
