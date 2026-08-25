import type { Group, Object3D, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type TRenderModelProps = Readonly<{
  src: string;
  // when set, enables node tracking: direction indicator, path trail and velocity panel
  trackedNodeName?: string;
  showPerformanceStats?: boolean;
}>;

export type TUseCenterModel = {
  gltf: GLTF;
  groupRef: React.RefObject<Group | null>;
};

export type TUseModelAnimation = {
  gltf: GLTF;
};

export type TUseNodeAnimation = {
  gltf: GLTF;
  nodeName?: string;
  pathParentRef: React.RefObject<Object3D | null>;
  movementSpeed?: number;
  rotationSpeed?: number;
};

export type TUseRobotMovement = {
  nodeRef: React.RefObject<Object3D | null>;
  movementSpeed?: number;
  rotationSpeed?: number;
};

export type TUseRobotPathTrail = {
  nodeRef: React.RefObject<Object3D | null>;
  pathParentRef: React.RefObject<Object3D | null>;
  speedRef: React.RefObject<number>;
};

export type TNodeDirectionIndicatorProps = {
  gltf: GLTF;
  nodeName: string;
  length?: number;
};

export type TUsePressedKeys = {
  keys: readonly string[];
};

export type TPerformanceMetrics = {
  drawCalls: number;
  geometries: number;
  triangles: number;
  textures: number;
  memoryUsedMB: number | null;
};

export type THudPosition = 'top-left' | 'top-right';

export type TPathPoint = Vector3;
