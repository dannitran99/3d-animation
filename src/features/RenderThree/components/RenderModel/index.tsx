import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { useCenterModel } from '../../hooks/useCenterModel';
import { useModelAnimation } from '../../hooks/useModelAnimation';
import { useNodeAnimation } from '../../hooks/useNodeAnimation';

type TRenderModelProps = Readonly<{
  src: string;
}>;

export const RenderModel: React.FC<TRenderModelProps> = ({ src }) => {
  const groupRef = useRef<Group>(null);

  const gltf = useLoader(GLTFLoader, src) as GLTF;

  useCenterModel({ gltf, groupRef });

  //for default animation
  useModelAnimation({ gltf });

  useNodeAnimation({ gltf, nodeName: 'Base' });

  console.log('gltf', gltf);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
};
