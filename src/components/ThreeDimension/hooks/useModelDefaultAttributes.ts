import { useEffect, useState } from 'react';
import { Box3, Vector3 } from 'three';
import * as THREE from 'three';
import {
  GROUND_ANTI_Z_COLLISION_DISTANCE,
  MODEL_MAX_HEIGHT_LENGTH,
  MODEL_MAX_WIDTH_LENGTH,
  SCENE_DIMENSIONS_RATIO
} from '../constants';

type TUseModelScaleProps = {
  meshes: Array<THREE.Mesh>;
};

export function useModelDefaultAttributes({ meshes }: TUseModelScaleProps) {
  const [scaleVector, setScaleVector] = useState<Vector3 | undefined>(undefined);
  const [positionVector, setPositionVector] = useState<Vector3 | undefined>(undefined);
  const [groundPositionVector, setGroundPositionVector] = useState<Vector3 | undefined>(undefined);

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScaleVector(new Vector3(scaleRatio, scaleRatio, scaleRatio));

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

    setPositionVector(
      new Vector3(modelPositionOnXAxis, modelPositionOnYAxis, modelPositionOnZAxis)
    );
    setGroundPositionVector(
      new Vector3(0, groundPositionOnYAxis - GROUND_ANTI_Z_COLLISION_DISTANCE, 0)
    );
  }, [meshes]);

  return {
    scaleVector,
    positionVector,
    groundPositionVector
  };
}
