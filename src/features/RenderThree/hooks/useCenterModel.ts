import { useEffect } from 'react';
import { Box3, Vector3 } from 'three';

import { MODEL_TARGET_SIZE } from '../constants';
import type { TUseCenterModel } from '../type';

// center and normalize scale so the model always fits the view
export const useCenterModel = ({ gltf, groupRef }: TUseCenterModel) => {
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const box = new Box3().setFromObject(gltf.scene);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = MODEL_TARGET_SIZE / maxDimension;
    group.scale.setScalar(scale);
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [gltf, groupRef]);
};
