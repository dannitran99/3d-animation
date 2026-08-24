import './index.scss';

import { ThreeDToolsProvider } from './providers/ThreeDToolsProvider';
import { ThreeDLoadingProvider } from './providers/ThreeDLoadingProvider';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ThreeDModel } from './components/Scene/ThreeDModel';
import { ProgressLoader } from './components/Scene/ProgressLoader';
import { OrbitControls, Preload } from '@react-three/drei';
import { ThreeDLight } from './components/Scene/ThreeDLight';

type TThreeDimensionProps = Readonly<{
  src: string;
}>;

export const ThreeDimension: React.FC<TThreeDimensionProps> = ({ src }: TThreeDimensionProps) => {
  return (
    <ThreeDToolsProvider>
      <ThreeDLoadingProvider>
        <div className="three-dimension">
          <ProgressLoader />
          <Canvas shadows="soft" camera={{ position: [5, 1, 5], fov: 25 }}>
            <Suspense fallback={null}>
              <ThreeDModel src={src} />
              <ThreeDLight />
              <OrbitControls
                minPolarAngle={0}
                maxPolarAngle={2 * Math.PI}
                // enableRotate={enableRotate}
              />
              <Preload all />
            </Suspense>
          </Canvas>
        </div>
      </ThreeDLoadingProvider>
    </ThreeDToolsProvider>
  );
};
