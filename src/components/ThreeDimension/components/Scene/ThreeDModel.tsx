import { useModelLoader } from '../../hooks/useModelLoader';
import { useThreeDLoadingContext } from '../../providers/ThreeDLoadingProvider';
import { Model } from '../Model';
import { useEffect } from 'react';
import type { Group } from 'three';

type TThreeDModelProps = {
  src: string;
};

export const ThreeDModel = ({ src }: TThreeDModelProps) => {
  const { updateLoadingProgress, updateHasModelRendered } = useThreeDLoadingContext();

  const { model } = useModelLoader({
    url: src,
    hasAnimations: true,
    progressCallback: (progress) => {
      updateLoadingProgress(Math.min(Math.ceil((progress.loaded / progress.total) * 100), 100));
    }
  });

  useEffect(() => {
    if (model) updateHasModelRendered(true);
  }, [model, updateHasModelRendered]);

  return <>{model && <Model model={model as Group} />}</>;
};
