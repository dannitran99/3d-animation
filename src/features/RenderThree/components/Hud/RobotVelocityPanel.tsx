import { HudPanel } from './HudPanel';

type TRobotVelocityPanelProps = Readonly<{
  speed: number;
}>;

export const RobotVelocityPanel = ({ speed }: TRobotVelocityPanelProps) => (
  <HudPanel position="top-left">
    <span className="hud-panel__label">Robot velocity</span>
    <strong>{speed.toFixed(2)} units/s</strong>
  </HudPanel>
);
