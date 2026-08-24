/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { AnimationMixer, AnimationObjectGroup, Object3D, type Object3DEventMap } from 'three';
import { useThreeDToolsContext } from '../providers/ThreeDToolsProvider';

type TUseModelAnimation = {
  model: Object3D<Object3DEventMap> | AnimationObjectGroup;
};

// Understand that the model here will always have the same animations,because they are all generated from the same source model and controlled globally
// Model passed as props to make this hook reusable for multiple cloned models (like wireframe model, bone model, etc)
export const useModelAnimation = ({ model }: TUseModelAnimation) => {
  const { animations, animationPlaySpeed, currentAnimationIndex, isModelPlaying, progressRef } =
    useThreeDToolsContext();
  const modelMixer: AnimationMixer = useMemo(() => new AnimationMixer(model), [model]);
  const currentClip = useMemo(() => {
    if (animations && animations.length > 0 && currentAnimationIndex !== -1)
      return animations[currentAnimationIndex];
  }, [animations, currentAnimationIndex]);

  const currentAction = useMemo(() => {
    if (currentClip) {
      return modelMixer.clipAction(currentClip);
    }
  }, [currentClip, modelMixer]);

  useEffect(() => {
    modelMixer && modelMixer.stopAllAction();
  }, [currentAction]);

  useEffect(() => {
    if (!currentAction) return;
    currentAction.play();
    currentAction.paused = !isModelPlaying;
  }, [isModelPlaying, currentAction]);

  useFrame((_, delta) => {
    if (currentClip && currentAction && modelMixer) {
      modelMixer.update(delta * animationPlaySpeed);
      if (isModelPlaying) {
        const duration = currentClip.duration;
        progressRef.current = currentAction.time / duration; // cập nhật ref, không gây re-render
      } else {
        // nếu nó đang dừng mà có chỗ nào làm thay đổi progressRef của nó thì frame cũng tự chỉnh theo, còn không thì dòng này không gây ảnh hưởng gì cả
        currentAction.time = progressRef.current * currentClip.duration;
      }
    }
  });
};
