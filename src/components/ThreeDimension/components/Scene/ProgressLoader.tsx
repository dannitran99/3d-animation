import './ProgressLoader.scss';

import { TriangleAlert } from 'lucide-react';

import { useThreeDLoadingContext } from '../../providers/ThreeDLoadingProvider';

export const ProgressLoader = () => {
  const { loadingProgress, isLoadingError, hasRendered } = useThreeDLoadingContext();

  if (hasRendered) return null;

  if (isLoadingError) {
    return (
      <div className="progress-loader">
        <div className="progress-loader__error">
          <TriangleAlert size={28} />
          <p>Cannot load 3D model. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-loader">
      <div className="progress-loader__content">
        <div className="progress-loader__track">
          <div className="progress-loader__fill" style={{ width: `${loadingProgress}%` }} />
        </div>
        <span className="progress-loader__label">{loadingProgress}%</span>
      </div>
    </div>
  );
};
