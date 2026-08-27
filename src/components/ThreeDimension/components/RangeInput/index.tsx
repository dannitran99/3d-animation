import './index.scss';

type TRangeInput = Readonly<{
  min: number;
  max: number;
  step: number;
  currentValue: number;
  changeValueCallback: (value: number) => void;
}>;

export function RangeInput({ min, max, step, currentValue, changeValueCallback }: TRangeInput) {
  return (
    <div>
      <div className="flex justify-between items-end">
        <span className="text-secondary label">{min}</span>
        <span className="text-secondary label">{max}</span>
      </div>
      <input
        type="range"
        className="form-range w-full"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(e) => changeValueCallback(Number(e.target.value))}
      />
    </div>
  );
}
