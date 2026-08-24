import { useEffect, useMemo } from 'react';
import type { Group } from 'three';
import { getMeshesFromObject3d } from '../../utils/getMeshesFromObject3d';
import { useModelDefaultAttributes } from '../../hooks/useModelDefaultAttributes';
import { Primitive } from './Primitive';
import { useThreeDLoadingContext } from '../../providers/ThreeDLoadingProvider';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { useModelAnimation } from '../../hooks/useModelAnimation';
import { toggleModelShadow } from '../../utils/toggleModelShadow';

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
    if (typeof scaleVector !== 'undefined' && typeof positionVector !== 'undefined')
      updateHasModelRendered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scaleVector, positionVector]);

  return <Primitive object={model} scale={scaleVector} position={positionVector} />;
};
