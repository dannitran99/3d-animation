import { useModelLoader } from '@/hooks/useModelLoader';
import { useThreeDLoadingContext } from './ThreeDLoadingProvider';

type TThreeDModelProps = {
  src: string;
};

export const ThreeDModel = ({ src }: TThreeDModelProps) => {
  const { updateLoadingProgress } = useThreeDLoadingContext();

  const { model } = useModelLoader({
    url: src,
    hasAnimations: true,
    progressCallback: (progress) => {
      updateLoadingProgress(Math.min(Math.ceil((progress.loaded / progress.total) * 100), 100));
    }
  });

  console.log(model);
  return <></>;
};
