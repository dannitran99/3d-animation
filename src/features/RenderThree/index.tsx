import './index.scss';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { RenderModel } from './components/RenderModel';

const FILE_SRC = new URL('../../assets/3dModel/ridgeback_franka.glb', import.meta.url).href;

export const RenderThree = () => {
  return (
    <div className="model-render">
      <div className="model-render__container">
        <div className="model-render__preview">
          <Canvas shadows camera={{ position: [5, 1, 5], fov: 25 }}>
            {/* <color attach="background" args={['#ffe6e6']} /> */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <RenderModel src={FILE_SRC} />
            </Suspense>
            <OrbitControls />
            {/* <axesHelper args={[2]} /> */}
          </Canvas>
        </div>
      </div>
    </div>
  );
};
