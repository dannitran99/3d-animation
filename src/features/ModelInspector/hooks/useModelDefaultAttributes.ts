import { useMemo } from 'react';
import * as THREE from 'three';
import { Box3, Vector3 } from 'three';

import {
  GROUND_ANTI_Z_COLLISION_DISTANCE,
  MODEL_MAX_HEIGHT_LENGTH,
  MODEL_MAX_WIDTH_LENGTH,
  SCENE_DIMENSIONS_RATIO
} from '../constants';

type TUseModelScaleProps = {
  meshes: Array<THREE.Mesh>;
};

type TModelDefaultAttributes = {
  scaleVector?: Vector3;
  positionVector?: Vector3;
  groundPositionVector?: Vector3;
};

const modelDefaultAttributesCache = new Map<string, TModelDefaultAttributes>();

export function useModelDefaultAttributes({
  meshes
}: TUseModelScaleProps): TModelDefaultAttributes {
  return useMemo(() => {
    const cacheKey = meshes.map((mesh) => mesh.uuid).join('|');

    if (!cacheKey) return {};

    const cachedAttributes = modelDefaultAttributesCache.get(cacheKey);
    if (cachedAttributes) return cachedAttributes;

    const meshMinYValues: Array<number> = [];
    const meshMaxYValues: Array<number> = [];
    const meshMinXValues: Array<number> = [];
    const meshMaxXValues: Array<number> = [];
    const meshMinZValues: Array<number> = [];
    const meshMaxZValues: Array<number> = [];

    meshes.forEach((mesh) => {
      const boundingBox = new Box3();
      mesh.updateMatrixWorld(true);
      mesh.geometry.computeBoundingBox();
      boundingBox.copy(mesh.geometry.boundingBox as Box3);
      boundingBox.applyMatrix4(mesh.matrixWorld);

      const boxDimensionMin = boundingBox.min;
      const boxDimensionMax = boundingBox.max;

      if (boxDimensionMin && boxDimensionMax) {
        // x axis
        meshMinXValues.push(boxDimensionMin.x);
        meshMaxXValues.push(boxDimensionMax.x);

        // y axis
        meshMinYValues.push(boxDimensionMin.y);
        meshMaxYValues.push(boxDimensionMax.y);

        // z axis
        meshMinZValues.push(boxDimensionMin.z);
        meshMaxZValues.push(boxDimensionMax.z);
      }
    });

    if (!meshMinYValues.length) return {};

    const maxLengthOnX = Math.abs(Math.max(...meshMaxXValues) - Math.min(...meshMinXValues));
    const maxLengthOnY = Math.abs(Math.max(...meshMaxYValues) - Math.min(...meshMinYValues));
    const maxLengthOnZ = Math.abs(Math.max(...meshMaxZValues) - Math.min(...meshMinZValues));
    const maxLengthOnWidth = Math.max(maxLengthOnX, maxLengthOnZ);
    const maxLengthOnHeight = maxLengthOnY;
    const modelLengthRatio = maxLengthOnWidth / maxLengthOnHeight;
    const scaleRatio =
      modelLengthRatio > SCENE_DIMENSIONS_RATIO
        ? MODEL_MAX_WIDTH_LENGTH / maxLengthOnWidth
        : MODEL_MAX_HEIGHT_LENGTH / maxLengthOnHeight;

    if (!Number.isFinite(scaleRatio)) return {};

    const scaleVector = new Vector3(scaleRatio, scaleRatio, scaleRatio);

    const modelCenterPositionOnYAxis =
      ((Math.max(...meshMaxYValues) + Math.min(...meshMinYValues)) / 2) * scaleRatio;

    const modelCenterPositionOnXAxis =
      ((Math.max(...meshMaxXValues) + Math.min(...meshMinXValues)) / 2) * scaleRatio;

    const modelCenterPositionOnZAxis =
      ((Math.max(...meshMaxZValues) + Math.min(...meshMinZValues)) / 2) * scaleRatio;

    const modelPositionOnYAxis = -modelCenterPositionOnYAxis;

    const modelPositionOnXAxis = -modelCenterPositionOnXAxis;

    const modelPositionOnZAxis = -modelCenterPositionOnZAxis;

    const groundPositionOnYAxis = Math.min(...meshMinYValues) * scaleRatio + modelPositionOnYAxis;

    const modelDefaultAttributes = {
      scaleVector,
      positionVector: new Vector3(modelPositionOnXAxis, modelPositionOnYAxis, modelPositionOnZAxis),
      groundPositionVector: new Vector3(
        0,
        groundPositionOnYAxis - GROUND_ANTI_Z_COLLISION_DISTANCE,
        0
      )
    };

    modelDefaultAttributesCache.set(cacheKey, modelDefaultAttributes);

    return modelDefaultAttributes;
  }, [meshes]);
}
