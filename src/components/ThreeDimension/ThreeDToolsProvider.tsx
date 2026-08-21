import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react';
import type { AnimationClip } from 'three';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TThreeDToolsContext = {
  animations: AnimationClip[] | [];
  setAnimations: Dispatch<SetStateAction<AnimationClip[]>>;
  isModelPlaying: boolean;
  setModelPlaying: (value: boolean) => void;
};

const initThreeDToolsContextValue: TThreeDToolsContext = {
  animations: [],
  setAnimations: () => {},
  isModelPlaying: false,
  setModelPlaying: () => {}
};

const ThreeDToolsContext = createContext<TThreeDToolsContext>(initThreeDToolsContextValue);

type TThreeDToolsProviderProps = {
  children: ReactNode;
};

const ThreeDToolsProvider = ({ children }: TThreeDToolsProviderProps) => {
  const [animations, setAnimations] = useState<AnimationClip[]>([]);
  const [isModelPlaying, setIsModelPlaying] = useState<boolean>(false);

  const setModelPlaying = (value: boolean) => {
    setIsModelPlaying(value);
  };

  const value: TThreeDToolsContext = useMemo(
    () => ({
      animations,
      setAnimations,
      isModelPlaying,
      setModelPlaying
    }),
    [animations, isModelPlaying]
  );
  return <ThreeDToolsContext.Provider value={value}>{children}</ThreeDToolsContext.Provider>;
};

const useThreeDToolsContext = () => useContext(ThreeDToolsContext);

export { ThreeDToolsProvider, useThreeDToolsContext };
