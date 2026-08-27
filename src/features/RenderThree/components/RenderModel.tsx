import { Line } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';

import { PATH_TRAIL_COLOR, PATH_TRAIL_LINE_WIDTH } from '../constants';
import { useCenterModel } from '../hooks/useCenterModel.ts';
import { useGltfModel } from '../hooks/useGltfModel.ts';
import { useModelAnimation } from '../hooks/useModelAnimation.ts';
import { useNodeAnimation } from '../hooks/useNodeAnimation.ts';
import type { TRenderModelProps } from '../type';

import { PerformanceStatsPanel } from './Hud/PerformanceStatsPanel';
import { RobotVelocityPanel } from './Hud/RobotVelocityPanel';
import { NodeDirectionIndicator } from './NodeDirectionIndicator.tsx';

export const RenderModel: React.FC<TRenderModelProps> = ({
  src,
  trackedNodeName,
  showPerformanceStats = false
}) => {
  const groupRef = useRef<Group>(null);

  const gltf = useGltfModel(src);

  useCenterModel({ gltf, groupRef });

  // plays the model's embedded default animation clips
  useModelAnimation({ gltf });

  // no-ops internally when trackedNodeName is not provided
  const { displaySpeed, pathPoints } = useNodeAnimation({
    gltf,
    nodeName: trackedNodeName,
    pathParentRef: groupRef
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />

      {trackedNodeName && (
        <>
          <NodeDirectionIndicator gltf={gltf} nodeName={trackedNodeName} />
          {pathPoints.length > 1 && (
            <Line points={pathPoints} color={PATH_TRAIL_COLOR} lineWidth={PATH_TRAIL_LINE_WIDTH} />
          )}
          <RobotVelocityPanel speed={displaySpeed} />
        </>
      )}

      {showPerformanceStats && <PerformanceStatsPanel />}
    </group>
  );
};
