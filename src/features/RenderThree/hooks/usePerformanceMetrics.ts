import { useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';

import { BYTES_PER_MB } from '../constants';
import type { TPerformanceMetrics } from '../type';

// Chrome-only API, not part of the standard Performance type
type TPerformanceWithMemory = Performance & {
  memory?: { usedJSHeapSize: number };
};

// samples the renderer's frame stats for display in a HUD panel
export const usePerformanceMetrics = (): TPerformanceMetrics => {
  const { gl } = useThree();
  const [metrics, setMetrics] = useState<TPerformanceMetrics>({
    drawCalls: 0,
    geometries: 0,
    triangles: 0,
    textures: 0,
    memoryUsedMB: null
  });

  useFrame(() => {
    const info = gl.info;
    const heapMemory = (performance as TPerformanceWithMemory).memory;

    setMetrics({
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      memoryUsedMB: heapMemory ? heapMemory.usedJSHeapSize / BYTES_PER_MB : null
    });
  });

  return metrics;
};
