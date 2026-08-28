import { clsx } from 'clsx';
import { useMemo } from 'react';

import { useThreeDLoadingContext } from '../../providers/ThreeDLoadingProvider';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';

import { AnimationTimelineControl } from './AnimationControlTimeline';

type TAnimationControl = {
  isModelInspectorOpen: boolean;
};

export const AnimationControl = ({ isModelInspectorOpen }: TAnimationControl) => {
  const { animations } = useThreeDToolsContext();

  const { loadingProgress } = useThreeDLoadingContext();

  const hasAnimation = useMemo(() => {
    return animations.some((animation) => animation.duration > 0);
  }, [animations]);

  if (loadingProgress !== 100 || !hasAnimation) return;

  return (
    <div
      className={clsx(
        'animation-controls',
        isModelInspectorOpen
          ? 'animation-controls-state--shifted-right'
          : 'animation-controls-state-default'
      )}
    >
      <AnimationTimelineControl />
    </div>
  );
};
