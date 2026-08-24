import './index.scss';

import { ThreeDToolsProvider } from './providers/ThreeDToolsProvider';
import { ThreeDLoadingProvider } from './providers/ThreeDLoadingProvider';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { ThreeDModel } from './components/Scene/ThreeDModel';
import { ProgressLoader } from './components/Scene/ProgressLoader';
import { OrbitControls, Preload } from '@react-three/drei';
import { ThreeDLight } from './components/Scene/ThreeDLight';
import { ActionsPreview } from './components/Setting/ActionPreview';
import { ModelInspector } from './components/Setting/ModelInspector';
import { BackgroundModel } from './components/Scene/BackgroundModel';
type TThreeDimensionProps = Readonly<{
  src: string;
}>;

export const ThreeDimension: React.FC<TThreeDimensionProps> = ({ src }: TThreeDimensionProps) => {
  const [isHelperBarOn, setIsHelperBarOn] = useState(false);
  const [isEnableRotate, setIsEnableRotate] = useState(true);
  const toggleHelperBar = () => setIsHelperBarOn((prev) => !prev);
  const toggleEnableRotate = () => setIsEnableRotate((prev) => !prev);

  return (
    <ThreeDToolsProvider>
      <ThreeDLoadingProvider>
        <div className="three-dimension">
          <ModelInspector isOpened={isHelperBarOn} />
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
