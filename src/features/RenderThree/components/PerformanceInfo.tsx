import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';

export function PerformanceInfo() {
  const { gl } = useThree();

  const [metrics, setMetrics] = useState({
    drawCalls: 0,
    geometries: 0,
    triangles: 0,
    textures: 0
  });

  useFrame(() => {
    const info = gl.info;

    setMetrics({
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      geometries: info.memory.geometries,
      textures: info.memory.textures
    });
  });

  return (
    <Html fullscreen className="robot-velocity">
      <div className="robot-velocity__panel">
        <span className="robot-velocity__label">Draw Calls</span>
        <strong>{metrics.drawCalls}</strong>
        <span className="robot-velocity__label">Triangles</span>
        <strong>{metrics.triangles}</strong>
        <span className="robot-velocity__label">Geometries</span>
        <strong>{metrics.geometries}</strong>
        <span className="robot-velocity__label">Textures</span>
        <strong>{metrics.textures}</strong>
      </div>
    </Html>
  );
}
