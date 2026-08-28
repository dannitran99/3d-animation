import { WIRE_FRAME_COLOR_PICKER } from '../../constants';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { ColorPickerButton } from '../ColorPickerButton';
import { ToggleButton } from '../ToggleButton';

export function WireFrameSetting() {
  const {
    isWireFrameOn,
    toggleWireFrameMode,
    wireFrameColor,
    changeWireFrameColor,
    isWithMaterial,
    toggleIsWithMaterial
  } = useThreeDToolsContext();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-100 ">Wire Frame</span>
        <ToggleButton isOn={isWireFrameOn} color="#f59e0b" handleClick={toggleWireFrameMode} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-100 ">With Material</span>
        <ToggleButton
          isOn={isWithMaterial}
          color="#f59e0b"
          handleClick={toggleIsWithMaterial}
          isDisabled={!isWireFrameOn}
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <span className="text-xs text-gray-100 ">Wire Frame Color</span>
        <div className="flex flex-wrap hstack gap-1">
          {WIRE_FRAME_COLOR_PICKER.map((e) => (
            <ColorPickerButton
              isDisabled={!isWireFrameOn}
              key={e.value}
              colorPicker={e}
              isChecked={e === wireFrameColor}
              handleChecking={() => changeWireFrameColor(e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
