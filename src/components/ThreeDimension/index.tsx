import { ThreeDToolsProvider } from './ThreeDToolsProvider';
import { ThreeDLoadingProvider } from './ThreeDLoadingProvider';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

type TThreeDimensionProps = Readonly<{
  src: string;
}>;

export const ThreeDimension: React.FC<TThreeDimensionProps> = ({ src }: TThreeDimensionProps) => {
  console.log(src);

  return (
    <ThreeDToolsProvider>
      <ThreeDLoadingProvider>
        <div>
          <Canvas>
            <Suspense fallback={null}>
              <h1>3D Model Viewer</h1>
              <p>This is where the 3D model will be displayed.</p>
            </Suspense>
          </Canvas>
        </div>
      </ThreeDLoadingProvider>
    </ThreeDToolsProvider>
  );
};
