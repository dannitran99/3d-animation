import { useEffect } from 'react';
import { ArrowHelper, Vector3 } from 'three';

import { DIRECTION_INDICATOR_COLOR, DIRECTION_INDICATOR_LENGTH } from '../constants';
import type { TNodeDirectionIndicatorProps } from '../type';

export const NodeDirectionIndicator = ({
  gltf,
  nodeName,
  length = DIRECTION_INDICATOR_LENGTH
}: TNodeDirectionIndicatorProps) => {
  useEffect(() => {
    const node = gltf.scene.getObjectByName(nodeName);
    if (!node) return;

    const direction = new Vector3(0, 0, -1);
    const origin = new Vector3();
    const indicator = new ArrowHelper(
      direction,
      origin,
      length,
      DIRECTION_INDICATOR_COLOR,
      length * 0.25,
      length * 0.15
    );

    node.add(indicator);

    return () => {
      node.remove(indicator);
    };
  }, [gltf, length, nodeName]);

  return null;
};
