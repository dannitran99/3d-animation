import { useEffect } from 'react';
import { ArrowHelper, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

type TNodeDirectionIndicatorProps = {
  gltf: GLTF;
  nodeName: string;
  length?: number;
};

export const NodeDirectionIndicator = ({
  gltf,
  nodeName,
  length = 0.8
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
      '#00b894',
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
