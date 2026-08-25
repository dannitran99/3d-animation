import { Line } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { useCenterModel } from '../../hooks/useCenterModel';
import { useModelAnimation } from '../../hooks/useModelAnimation';
import { useNodeAnimation } from '../../hooks/useNodeAnimation';

import { NodeDirectionIndicator } from './NodeDirectionIndicator.tsx';

type TRenderModelProps = Readonly<{
  src: string;
}>;

export const RenderModel: React.FC<TRenderModelProps> = ({ src }) => {
  const groupRef = useRef<Group>(null);

  const gltf = useLoader(GLTFLoader, src) as GLTF;

  useCenterModel({ gltf, groupRef });

  //for default animation
  useModelAnimation({ gltf });

  const pathPoints = useNodeAnimation({ gltf, nodeName: 'Base', pathParentRef: groupRef });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
      <NodeDirectionIndicator gltf={gltf} nodeName="Base" />
      {pathPoints.length > 1 && <Line points={pathPoints} color="#ff6b35" lineWidth={3} />}
    </group>
  );
};
