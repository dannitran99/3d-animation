export const MODEL_SRC = new URL('../../../assets/3dModel/ridgeback_franka.glb', import.meta.url)
  .href;

export const CAMERA_CONFIG = {
  position: [5, 1, 5] as [number, number, number],
  fov: 25
};

export const ROBOT_NODE_NAME = 'Base';

export const MODEL_TARGET_SIZE = 2.5;

export const DIRECTION_INDICATOR_LENGTH = 0.8;
export const DIRECTION_INDICATOR_COLOR = '#00b894';

export const ROBOT_MOVEMENT_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'] as const;
export const ROBOT_MOVEMENT_SPEED = 2;
export const ROBOT_ROTATION_SPEED = 2;
export const ROBOT_MOVEMENT_LERP_RATE = 8;
export const ROBOT_MOVEMENT_THRESHOLD = 0.01;
export const VELOCITY_UI_UPDATE_INTERVAL = 0.05;

export const PATH_TRAIL_MAX_POINTS = 300;
export const PATH_TRAIL_MIN_DISTANCE = 0.05;
export const PATH_TRAIL_COLOR = '#ff6b35';
export const PATH_TRAIL_LINE_WIDTH = 3;

export const BYTES_PER_MB = 1024 * 1024;
