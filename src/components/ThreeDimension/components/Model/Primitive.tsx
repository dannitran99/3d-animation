import { Vector3 } from 'three';

type TPrimitiveProps = {
  object: object;
  scale?: Vector3;
  position?: Vector3;
  rotation?: Vector3;
  castShadow?: boolean;
  receiveShadow?: boolean;
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [properties: string]: any;
};

export function Primitive({
  object,
  scale,
  position,
  rotation,
  castShadow = false,
  receiveShadow = false,
  ...otherProperties
}: TPrimitiveProps) {
  return (
    <primitive
      object={object}
      scale={scale}
      position={position}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      {...otherProperties}
    />
  );
}
