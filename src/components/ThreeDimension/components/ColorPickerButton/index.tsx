import './index.scss';

import clsx from 'clsx';

import type { TColorPicker } from '../../type';

type TWireFrameColorCheckBoxProps = Readonly<{
  isDisabled: boolean;
  colorPicker: TColorPicker;
  isChecked: boolean;
  handleChecking: () => void;
}>;

export function ColorPickerButton({
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
