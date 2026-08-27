import {
  DIRECTIONAL_LIGHT_COLOR,
  GROUND_SHADOW_PLANE_SIZE,
  SPOT_LIGHT_COLOR
} from '../../constants';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';

export function ThreeDLight() {
  const { directionalLightIntensity, spotLightIntensity, isGroundShadowMode } =
    useThreeDToolsContext();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow={isGroundShadowMode}
        color={DIRECTIONAL_LIGHT_COLOR}
        intensity={directionalLightIntensity}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
      <directionalLight
        position={[5, 5, -5]}
        castShadow={isGroundShadowMode}
        color={DIRECTIONAL_LIGHT_COLOR}
        intensity={directionalLightIntensity}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow={isGroundShadowMode}
        color={DIRECTIONAL_LIGHT_COLOR}
        intensity={directionalLightIntensity}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
      <directionalLight
        position={[-5, 5, -5]}
        castShadow={isGroundShadowMode}
        color={DIRECTIONAL_LIGHT_COLOR}
        intensity={directionalLightIntensity}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
      <spotLight
        color={SPOT_LIGHT_COLOR}
        castShadow={isGroundShadowMode}
        intensity={spotLightIntensity}
        position={[3, 3, 3]}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
      <spotLight
        color={SPOT_LIGHT_COLOR}
        castShadow={isGroundShadowMode}
        intensity={spotLightIntensity}
        position={[-3, 3, 3]}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
      <spotLight
        color={SPOT_LIGHT_COLOR}
        castShadow={isGroundShadowMode}
        intensity={spotLightIntensity}
        position={[3, 3, -3]}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
      <spotLight
        color={SPOT_LIGHT_COLOR}
        castShadow={isGroundShadowMode}
        intensity={spotLightIntensity}
        position={[-3, 3, -3]}
        shadow-mapSize={GROUND_SHADOW_PLANE_SIZE}
      />
    </>
  );
}
