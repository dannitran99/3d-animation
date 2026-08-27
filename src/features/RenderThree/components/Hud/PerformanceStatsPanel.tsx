import { usePerformanceMetrics } from '../../hooks/usePerformanceMetrics';

import { HudPanel } from './HudPanel';

export const PerformanceStatsPanel = () => {
  const { drawCalls, triangles, geometries, textures, memoryUsedMB } = usePerformanceMetrics();

  return (
    <HudPanel position="top-right">
      <span className="hud-panel__label">Draw Calls</span>
      <strong>{drawCalls}</strong>
      <span className="hud-panel__label">Triangles</span>
      <strong>{triangles}</strong>
      <span className="hud-panel__label">Geometries</span>
      <strong>{geometries}</strong>
      <span className="hud-panel__label">Textures</span>
      <strong>{textures}</strong>
      <span className="hud-panel__label">Memory</span>
      <strong>{memoryUsedMB !== null ? `${memoryUsedMB.toFixed(1)} MB` : 'N/A'}</strong>
    </HudPanel>
  );
};
