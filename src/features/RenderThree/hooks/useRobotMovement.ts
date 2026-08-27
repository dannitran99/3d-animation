import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { MathUtils } from 'three';

import {
  ROBOT_MOVEMENT_KEYS,
  ROBOT_MOVEMENT_LERP_RATE,
  ROBOT_MOVEMENT_SPEED,
  ROBOT_ROTATION_SPEED,
  VELOCITY_UI_UPDATE_INTERVAL
} from '../constants';
import type { TUseRobotMovement } from '../type';

import { usePressedKeys } from './usePressedKeys';

// drives a node's forward/rotation velocity from keyboard input each frame
export const useRobotMovement = ({
  nodeRef,
  movementSpeed = ROBOT_MOVEMENT_SPEED,
  rotationSpeed = ROBOT_ROTATION_SPEED
}: TUseRobotMovement) => {
  const velocityRef = useRef({ forward: 0, rotation: 0 });
  const speedRef = useRef(0);
  const velocityUiTimerRef = useRef(0);
  const [displaySpeed, setDisplaySpeed] = useState(0);

  const pressedKeysRef = usePressedKeys({ keys: ROBOT_MOVEMENT_KEYS });

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
    const lerpFactor = 1 - Math.exp(-ROBOT_MOVEMENT_LERP_RATE * delta);

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

    speedRef.current = Math.abs(velocityRef.current.forward);

    velocityUiTimerRef.current += delta;
    if (velocityUiTimerRef.current >= VELOCITY_UI_UPDATE_INTERVAL) {
      velocityUiTimerRef.current = 0;
      setDisplaySpeed(speedRef.current);
    }
  });

  return { speedRef, displaySpeed };
};
