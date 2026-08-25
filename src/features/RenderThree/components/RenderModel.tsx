import { Html, Line } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { useCenterModel } from '../hooks/useCenterModel.ts';
import { useModelAnimation } from '../hooks/useModelAnimation.ts';
import { useNodeAnimation } from '../hooks/useNodeAnimation.ts';

import { NodeDirectionIndicator } from './NodeDirectionIndicator.tsx';
import { PerformanceInfo } from './PerformanceInfo.tsx';

type TRenderModelProps = Readonly<{
  src: string;
}>;

export const RenderModel: React.FC<TRenderModelProps> = ({ src }) => {
  const groupRef = useRef<Group>(null);

  const gltf = useLoader(GLTFLoader, src) as GLTF;

  useCenterModel({ gltf, groupRef });

  //for default animation
  useModelAnimation({ gltf });

  const { displaySpeed, pathPoints } = useNodeAnimation({
    gltf,
    nodeName: 'Base',
    pathParentRef: groupRef
  });
  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
      <NodeDirectionIndicator gltf={gltf} nodeName="Base" />
      {pathPoints.length > 1 && <Line points={pathPoints} color="#ff6b35" lineWidth={3} />}
      <Html fullscreen className="robot-velocity">
        <div className="robot-velocity__panel">
          <span className="robot-velocity__label">Robot velocity</span>
          <strong>{displaySpeed.toFixed(2)} units/s</strong>
        </div>
      </Html>
      <PerformanceInfo />
    </group>
  );
};
