import './index.scss';

import { OrbitControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

import { AxesHelper } from './components/Scene/AxesHelper';
import { BackgroundModel } from './components/Scene/BackgroundModel';
import { ProgressLoader } from './components/Scene/ProgressLoader';
import { ThreeDLight } from './components/Scene/ThreeDLight';
import { ThreeDModel } from './components/Scene/ThreeDModel';
import { ActionsPreview } from './components/Setting/ActionPreview';
import { AnimationControl } from './components/Setting/AnimationControl';
import { ModelInspectorSetting } from './components/Setting/ModelInspectorSetting';
import { ThreeDLoadingProvider } from './providers/ThreeDLoadingProvider';
import { ThreeDToolsProvider } from './providers/ThreeDToolsProvider';
type TThreeDimensionProps = Readonly<{
  src: string;
}>;

export const ModelInspector: React.FC<TThreeDimensionProps> = ({ src }: TThreeDimensionProps) => {
  const [isHelperBarOn, setIsHelperBarOn] = useState(false);
  const [isEnableRotate, setIsEnableRotate] = useState(true);
  const toggleHelperBar = () => setIsHelperBarOn((prev) => !prev);
  const toggleEnableRotate = () => setIsEnableRotate((prev) => !prev);

  return (
    <ThreeDToolsProvider>
      <ThreeDLoadingProvider>
        <div className="three-dimension">
          <ModelInspectorSetting isOpened={isHelperBarOn} />
          <AnimationControl isModelInspectorOpen={isHelperBarOn} />
          <ProgressLoader />
          <Canvas shadows="soft" camera={{ position: [5, 1, 5], fov: 25 }}>
            <BackgroundModel />
            <Suspense fallback={null}>
              <ThreeDModel src={src} />
              <ThreeDLight />
              <OrbitControls
                minPolarAngle={0}
                maxPolarAngle={2 * Math.PI}
                enableRotate={isEnableRotate}
              />
              <AxesHelper size={15} />
              <Preload all />
            </Suspense>
          </Canvas>
          <ActionsPreview
            isHelperBarOn={isHelperBarOn}
            toggleHelperBar={toggleHelperBar}
            isEnableRotate={isEnableRotate}
            toggleEnableRotate={toggleEnableRotate}
          />
        </div>
      </ThreeDLoadingProvider>
    </ThreeDToolsProvider>
  );
};
