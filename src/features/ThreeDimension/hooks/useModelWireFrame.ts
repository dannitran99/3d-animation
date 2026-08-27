import { useEffect } from 'react';
import { Group, Mesh, MeshBasicMaterial } from 'three';

type TUseModelWireFrameProps = {
  isWireFrameOn: boolean;
  wireFrameColorHexCode: string;
  isWithMaterial: boolean;
  model: Group;
  wireFrameModel: Group;
  wireFrameBackgroundModel: Group;
};

function toggleModelVisible(model: Group, isVisible: boolean) {
  model.traverse((child) => {
    if (child instanceof Mesh) {
      child.visible = isVisible;
    }
  });
}

export function useModelWireFrame({
  isWireFrameOn,
  model,
  wireFrameModel,
  wireFrameBackgroundModel,
  wireFrameColorHexCode,
  isWithMaterial
}: TUseModelWireFrameProps) {
  useEffect(() => {
    if (wireFrameBackgroundModel) {
      wireFrameBackgroundModel.traverse((child) => {
        if (child instanceof Mesh) {
          const material = new MeshBasicMaterial({
            color: 0xf2f2f2,
            polygonOffset: true,
            polygonOffsetFactor: 0,
            polygonOffsetUnits: 0
          });
          child.material = material;
        }
      });
    }
    if (wireFrameModel) {
      wireFrameModel.traverse((child) => {
        if (child instanceof Mesh) {
          const material = new MeshBasicMaterial({
            color: wireFrameColorHexCode,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1,
            wireframe: true
          });
          child.material = material;
        }
      });
    }
  }, [wireFrameModel, wireFrameBackgroundModel, wireFrameColorHexCode]);

  useEffect(() => {
    if (isWireFrameOn) {
      if (isWithMaterial) {
        toggleModelVisible(model, true);
        toggleModelVisible(wireFrameModel, true);
        toggleModelVisible(wireFrameBackgroundModel, false);
      } else {
        toggleModelVisible(model, false);
        toggleModelVisible(wireFrameBackgroundModel, true);
      }
      toggleModelVisible(wireFrameModel, true);
    } else {
      toggleModelVisible(model, true);
      toggleModelVisible(wireFrameModel, false);
      toggleModelVisible(wireFrameBackgroundModel, false);
    }
  }, [isWireFrameOn, wireFrameModel, model, wireFrameBackgroundModel, isWithMaterial]);
}
