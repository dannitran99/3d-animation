import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { AnimationMixer, Box3, type Group, Vector3 } from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type TRenderModelProps = Readonly<{
  src: string;
}>;

export const RenderModel: React.FC<TRenderModelProps> = ({ src }) => {
  const groupRef = useRef<Group>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);

  const gltf = useLoader(GLTFLoader, src) as GLTF;

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // center and normalize scale so the model always fits the view
    const box = new Box3().setFromObject(gltf.scene);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.5 / maxDimension;
    group.scale.setScalar(scale);
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    console.log(gltf.animations.length, gltf);
    if (gltf.animations.length > 0) {
      const mixer = new AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [gltf]);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      mixerRef.current?.update(delta);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
};
