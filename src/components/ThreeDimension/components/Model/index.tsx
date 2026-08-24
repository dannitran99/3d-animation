import { useMemo } from 'react';
import type { Group } from 'three';
import { getMeshesFromObject3d } from '../../utils/getMeshesFromObject3d';
import { useModelDefaultAttributes } from '../../hooks/useModelDefaultAttributes';
import { Primitive } from './Primitive';

type TModelProps = Readonly<{
  model: Group;
}>;

export const Model = ({ model }: TModelProps) => {
  const meshes = useMemo(() => {
    // recalculate meshes of object when object change
    const meshes = getMeshesFromObject3d(model);
    // force each mesh to be updated the matrix by three
    meshes.forEach((mesh) => mesh.updateWorldMatrix(true, true));
    return meshes;
  }, [model]);
  console.log('meshes', meshes);
  const { scaleVector, positionVector, groundPositionVector } = useModelDefaultAttributes({
    meshes: meshes
  });
  return <Primitive object={model} scale={scaleVector} position={positionVector} />;
};
