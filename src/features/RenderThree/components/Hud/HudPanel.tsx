import { Html } from '@react-three/drei';
import type { ReactNode } from 'react';

import type { THudPosition } from '../../type';

type THudPanelProps = Readonly<{
  children: ReactNode;
  position?: THudPosition;
}>;

// shared overlay wrapper for in-scene HUD panels (velocity, performance stats, ...)
export const HudPanel = ({ children, position = 'top-left' }: THudPanelProps) => (
  <Html fullscreen className="hud-panel-layer">
    <div className={`hud-panel hud-panel--${position}`}>{children}</div>
  </Html>
);
