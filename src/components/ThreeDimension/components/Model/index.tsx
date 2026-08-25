import { useEffect, useMemo } from 'react';
import type { Group } from 'three';

import { useModelAnimation } from '../../hooks/useModelAnimation';
import { useModelDefaultAttributes } from '../../hooks/useModelDefaultAttributes';
import { useThreeDLoadingContext } from '../../providers/ThreeDLoadingProvider';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { getMeshesFromObject3d } from '../../utils/getMeshesFromObject3d';
import { toggleModelShadow } from '../../utils/toggleModelShadow';

import { ModelShadow } from './ModelShadow';
import { Primitive } from './Primitive';

type TModelProps = Readonly<{
  model: Group;
}>;

export const Model = ({ model }: TModelProps) => {
  const meshes = useMemo(() => {
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    model.updateMatrixWorld(true);

    // recalculate meshes of object when object change
    const meshes = getMeshesFromObject3d(model);
    // force each mesh to be updated the matrix by three
    meshes.forEach((mesh) => mesh.updateWorldMatrix(true, true));
    return meshes;
  }, [model]);
  const { scaleVector, positionVector, groundPositionVector } = useModelDefaultAttributes({
    meshes: meshes
  });

  const { isWireFrameOn, isBoundingBoxOn, isGroundShadowMode, isBoneOn, isBoneInfluenceOn } =
    useThreeDToolsContext();
  const { updateHasModelRendered } = useThreeDLoadingContext();

  useEffect(() => {
    toggleModelShadow(model, isGroundShadowMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroundShadowMode]);

  useModelAnimation({
    model: model
  });

  useEffect(() => {
    if (typeof scaleVector !== 'undefined' && typeof positionVector !== 'undefined') {
      updateHasModelRendered(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scaleVector, positionVector]);

  return (
    <>
      <Primitive object={model} scale={scaleVector} position={positionVector} />
      {!isWireFrameOn && <ModelShadow position={groundPositionVector} />}
    </>
  );
};
