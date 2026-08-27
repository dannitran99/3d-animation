import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { type Object3D, Vector3 } from 'three';

import {
  PATH_TRAIL_MAX_POINTS,
  PATH_TRAIL_MIN_DISTANCE,
  ROBOT_MOVEMENT_THRESHOLD
} from '../constants';
import type { TUseRobotPathTrail } from '../type';

// records the node's world-space trajectory into a bounded trail of points
export const useRobotPathTrail = ({ nodeRef, pathParentRef, speedRef }: TUseRobotPathTrail) => {
  const lastPathPointRef = useRef<Vector3 | null>(null);
  const trackedNodeRef = useRef<Object3D | null>(null);
  const [pathPoints, setPathPoints] = useState<Vector3[]>([]);

  useFrame(() => {
    const node = nodeRef.current;
    const pathParent = pathParentRef.current;
    if (!node || !pathParent) return;

    if (trackedNodeRef.current !== node) {
      trackedNodeRef.current = node;
      lastPathPointRef.current = null;
      setPathPoints([]);
    }

    if (speedRef.current < ROBOT_MOVEMENT_THRESHOLD) return;

    const pathPoint = pathParent.worldToLocal(node.getWorldPosition(new Vector3()));
    const previousPathPoint = lastPathPointRef.current;
    if (previousPathPoint && previousPathPoint.distanceTo(pathPoint) < PATH_TRAIL_MIN_DISTANCE) {
      return;
    }

    lastPathPointRef.current = pathPoint;
    setPathPoints((points) => [...points.slice(-(PATH_TRAIL_MAX_POINTS - 1)), pathPoint]);
  });

  return pathPoints;
};
