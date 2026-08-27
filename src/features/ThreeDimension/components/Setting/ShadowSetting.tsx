import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { ToggleButton } from '../ToggleButton';

export const ShadowSetting = () => {
  const {
    isModelShadowOn,
    toggleModelShadow,
    isContactShadowMode,
    toggleContactShadowMode,
    isGroundShadowMode,
    toggleGroundShadowMode
  } = useThreeDToolsContext();

  const handleToggleGroundShadowMode = () => {
    if (!isGroundShadowMode) {
      window.alert('Enabling ground shadow mode will consume more device resources.');
    }
    toggleGroundShadowMode();
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-100">Model Shadow</span>
        <ToggleButton isOn={isModelShadowOn} color="#f59e0b" handleClick={toggleModelShadow} />
      </div>

      <div className="flex flex-col gap-2 border-l border-border pl-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={isModelShadowOn ? 'text-xs text-gray-100' : 'text-xs text-muted-foreground'}
          >
            Contact Mode
          </span>
          <ToggleButton
            isOn={isContactShadowMode}
            color="#f59e0b"
            handleClick={toggleContactShadowMode}
            isDisabled={!isModelShadowOn}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <span
            className={isModelShadowOn ? 'text-xs text-gray-100' : 'text-xs text-muted-foreground'}
          >
            Ground Mode
          </span>
          <ToggleButton
            isOn={isGroundShadowMode}
            color="#f59e0b"
            handleClick={handleToggleGroundShadowMode}
            isDisabled={!isModelShadowOn}
          />
        </div>
      </div>
    </div>
  );
};
