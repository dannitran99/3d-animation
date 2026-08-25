import { FRAME_BACKGROUND_COLOR_PICKER } from '../../constants';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { ColorPickerButton } from '../ColorPickerButton';

export function BackgroundSetting() {
  const { backgroundColor, changeBackgroundColor } = useThreeDToolsContext();
  return (
    <div className="flex flex-wrap hstack gap-1">
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
