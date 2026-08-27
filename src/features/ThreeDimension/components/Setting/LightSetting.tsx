import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { RangeInput } from '../RangeInput';

export function LightsSetting() {
  const {
    directionalLightIntensity,
    changeDirectionalLightIntensity,
    spotLightIntensity,
    changeSpotLightIntensity
  } = useThreeDToolsContext();

  return (
    <div className="container vstack gap-2 p-0">
      <div className="flex flex-col justify-between gap-2">
        <span className="text-xs text-gray-100 ">Directional Light Intensity</span>
        <RangeInput
          min={0}
          max={5}
          step={0.1}
          currentValue={directionalLightIntensity}
          changeValueCallback={changeDirectionalLightIntensity}
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <span className="text-xs text-gray-100">Spot Light Intensity</span>
        <RangeInput
          min={0}
          max={100}
          step={1}
          currentValue={spotLightIntensity}
          changeValueCallback={changeSpotLightIntensity}
        />
      </div>
    </div>
  );
}
