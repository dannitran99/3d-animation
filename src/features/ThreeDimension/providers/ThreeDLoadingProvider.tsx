import { createContext, type ReactNode,useContext, useMemo, useState } from 'react';

type TThreeDLoadingContext = {
  isLoadingError: boolean;
  updateLoadingError: (isError: boolean) => void;
  loadingProgress: number;
  updateLoadingProgress: (progress: number) => void;
  hasRendered: boolean;
  updateHasModelRendered: (hasRendered: boolean) => void;
};

const initThreeDLoadingContextValue: TThreeDLoadingContext = {
  isLoadingError: false,
  updateLoadingError: () => {},
  loadingProgress: 0,
  updateLoadingProgress: () => {},
  hasRendered: false,
  updateHasModelRendered: () => {}
};

const ThreeDLoadingContext = createContext<TThreeDLoadingContext>(initThreeDLoadingContextValue);

type TThreeDLoadingProviderProps = {
  children: ReactNode;
};

const ThreeDLoadingProvider = ({ children }: TThreeDLoadingProviderProps) => {
  const {
    isLoadingError: defaultIsLoadingError,
    loadingProgress: defaultLoadingProgress,
    hasRendered: defaultHasRendered
  } = initThreeDLoadingContextValue;

  const [isLoadingError, setIsLoadingError] = useState<boolean>(defaultIsLoadingError);
  const [loadingProgress, setLoadingProgress] = useState<number>(defaultLoadingProgress);
  const [hasRendered, setHasRendered] = useState<boolean>(defaultHasRendered);

  const updateLoadingError = (isError: boolean) => {
    setIsLoadingError(isError);
  };
  const updateLoadingProgress = (progress: number) => {
    setLoadingProgress(progress);
  };
  const updateHasModelRendered = (hasRendered: boolean) => {
    setHasRendered(hasRendered);
  };

  const value = useMemo(
    () => ({
      isLoadingError,
      loadingProgress,
      hasRendered,
      updateLoadingProgress,
      updateHasModelRendered,
      updateLoadingError
    }),
    [loadingProgress, hasRendered, isLoadingError]
  );

  return <ThreeDLoadingContext.Provider value={value}>{children}</ThreeDLoadingContext.Provider>;
};

const useThreeDLoadingContext = () => useContext(ThreeDLoadingContext);

export { ThreeDLoadingProvider, useThreeDLoadingContext };
