import './ModelInspector.scss';

import clsx from 'clsx';
import { FRAME_BACKGROUND_COLOR_PICKER } from '../../constants';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import type { TColorPicker } from '../../type';

type TWireFrameColorCheckBoxProps = Readonly<{
  isDisabled: boolean;
  colorPicker: TColorPicker;
  isChecked: boolean;
  handleChecking: () => void;
}>;

function ColorPickerButton({
  isDisabled,
  colorPicker,
  isChecked,
  handleChecking
}: TWireFrameColorCheckBoxProps) {
  return (
    <button
      style={{ background: colorPicker.hexCode }}
      className={clsx(
        'button-color-picker',
        isChecked ? 'button-color-picker-state--checked' : 'button-color-picker-state--not-checked',
        isDisabled && 'button-color-picker-state--disabled'
      )}
      onClick={handleChecking}
      disabled={isDisabled}
    ></button>
  );
}

export function BackgroundSetting() {
  const { backgroundColor, changeBackgroundColor } = useThreeDToolsContext();
  return (
    <div className="color-field flex-wrap hstack gap-1">
      {FRAME_BACKGROUND_COLOR_PICKER.map((e) => (
        <ColorPickerButton
          isDisabled={false}
          key={e.value}
          colorPicker={e}
          isChecked={e === backgroundColor}
          handleChecking={() => changeBackgroundColor(e)}
        />
      ))}
    </div>
  );
}
