import './index.scss';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { RenderModel } from './components/RenderModel';
import { SceneLights } from './components/Scene/SceneLights';
import { CAMERA_CONFIG, MODEL_SRC } from './constants';

type TRenderThreeProps = Readonly<{
  trackedNodeName?: string;
  showPerformanceStats?: boolean;
}>;

export const RenderThree = ({
  trackedNodeName,
  showPerformanceStats = false
}: TRenderThreeProps) => {
  return (
    <div className="model-render">
      <div className="model-render__container">
        <div className="model-render__preview">
          <Canvas shadows camera={CAMERA_CONFIG}>
            <SceneLights />
            <Suspense fallback={null}>
              <RenderModel
                src={MODEL_SRC}
                trackedNodeName={trackedNodeName}
                showPerformanceStats={showPerformanceStats}
              />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
};
