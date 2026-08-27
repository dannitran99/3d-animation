import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { ToggleButton } from '../ToggleButton';

export function BoundingBoxSetting() {
  const { isBoundingBoxOn, toggleBoundingBoxMode, isAxesHelperOn, toggleAxesHelperMode } =
    useThreeDToolsContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-100 ">Bounding Box</span>
        <ToggleButton isOn={isBoundingBoxOn} color="#f59e0b" handleClick={toggleBoundingBoxMode} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-100 ">Axes Helper</span>
        <ToggleButton isOn={isAxesHelperOn} color="#f59e0b" handleClick={toggleAxesHelperMode} />
      </div>
    </div>
  );
}
