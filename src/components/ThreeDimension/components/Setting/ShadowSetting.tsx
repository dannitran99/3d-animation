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
    <div className="container vstack gap-2 p-0">
      <ToggleButton isOn={isModelShadowOn} color="#f59e0b" handleClick={toggleModelShadow} />

      <div className="hstack gap-2 justify-content-between">
        <span className={!isModelShadowOn ? 'text-muted' : 'text-secondary'}>Contact Mode</span>
        <ToggleButton
          isOn={isContactShadowMode}
          color="#f59e0b"
          handleClick={toggleContactShadowMode}
          isDisabled={!isModelShadowOn}
        />
      </div>

      <div className="hstack gap-2 justify-content-between">
        <span className={!isModelShadowOn ? 'text-muted' : 'text-secondary'}>Ground Mode</span>
        <ToggleButton
          isOn={isGroundShadowMode}
          color="#f59e0b"
          handleClick={handleToggleGroundShadowMode}
          isDisabled={!isModelShadowOn}
        />
      </div>
    </div>
  );
};
