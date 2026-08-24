import { ContactShadows, Plane } from '@react-three/drei';
import { Vector3 } from 'three';
import {
  CONTACT_SHADOW_COLOR,
  GROUND_SHADOW_PLANE_COLOR,
  GROUND_SHADOW_PLANE_SIZE
} from '../../constants';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';

type TModelShadows = {
  position?: Vector3;
};

export function ModelShadow({ position }: Readonly<TModelShadows>) {
  const { isModelShadowOn, isContactShadowMode, isGroundShadowMode } = useThreeDToolsContext();
  return (
    <>
      {isModelShadowOn && (
        <>
          {isContactShadowMode && (
            <ContactShadows
              position={position}
              color={CONTACT_SHADOW_COLOR}
              smooth={true}
              far={10}
              scale={50}
              resolution={2048}
            />
          )}
          {isGroundShadowMode && (
            <Plane
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              position={position}
              args={GROUND_SHADOW_PLANE_SIZE}
            >
              <meshStandardMaterial attach="material" color={GROUND_SHADOW_PLANE_COLOR} />
            </Plane>
          )}
        </>
      )}
    </>
  );
}
