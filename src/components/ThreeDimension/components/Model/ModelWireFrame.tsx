import { useMemo } from 'react';
import { Group, Vector3 } from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

import { useModelAnimation } from '../../hooks/useModelAnimation';
import { useModelWireFrame } from '../../hooks/useModelWireFrame';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';

import { Primitive } from './Primitive';

type TWireFrameProps = Readonly<{
  model: Group;
  scaleVector?: Vector3;
  positionVector?: Vector3;
}>;

export function ModelWireFrame({ model, scaleVector, positionVector }: TWireFrameProps) {
  const wireFrameModel: Group = useMemo(() => SkeletonUtils.clone(model) as Group, [model]);
  const wireFrameBackgroundModel: Group = useMemo(
    () => SkeletonUtils.clone(model) as Group,
    [model]
  );

  useModelAnimation({
    model: wireFrameModel
  });

  useModelAnimation({
    model: wireFrameBackgroundModel
  });

  const { isWireFrameOn, wireFrameColor, isWithMaterial } = useThreeDToolsContext();

  useModelWireFrame({
    isWireFrameOn: isWireFrameOn,
    wireFrameColorHexCode: wireFrameColor.hexCode,
    isWithMaterial: isWithMaterial,
    model: model,
    wireFrameModel: wireFrameModel,
    wireFrameBackgroundModel: wireFrameBackgroundModel
  });

  return (
    <>
      {wireFrameModel && (
        <Primitive object={wireFrameModel} scale={scaleVector} position={positionVector} />
      )}
      {wireFrameBackgroundModel && (
        <Primitive
          object={wireFrameBackgroundModel}
          scale={scaleVector}
          position={positionVector}
        />
      )}
    </>
  );
}
