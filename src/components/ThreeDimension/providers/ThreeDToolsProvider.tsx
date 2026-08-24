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
  directionalLightIntensity: number;
  changeDirectionalLightIntensity: (value: number) => void;
  spotLightIntensity: number;
  changeSpotLightIntensity: (value: number) => void;
  isModelShadowOn: boolean;
  toggleModelShadow: () => void;
  isContactShadowMode: boolean;
  toggleContactShadowMode: () => void;
  isGroundShadowMode: boolean;
  toggleGroundShadowMode: () => void;
  isModelPlaying: boolean;
  setModelPlaying: (value: boolean) => void;
};

const initThreeDToolsContextValue: TThreeDToolsContext = {
  animations: [],
  setAnimations: () => {},
  directionalLightIntensity: 1,
  changeDirectionalLightIntensity: () => {},
  spotLightIntensity: 1,
  changeSpotLightIntensity: () => {},
  isModelShadowOn: false,
  toggleModelShadow: () => {},
  isContactShadowMode: false,
  toggleContactShadowMode: () => {},
  isGroundShadowMode: false,
  toggleGroundShadowMode: () => {},
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

  const [directionalLightIntensity, setDirectionalLightIntensity] = useState<number>(1);
  const [spotLightIntensity, setSpotLightIntensity] = useState<number>(1);

  const [isModelShadowOn, setIsModelShadowOn] = useState<boolean>(false);
  const [isContactShadowMode, setIsContactShadowMode] = useState<boolean>(false);
  const [isGroundShadowMode, setIsGroundShadowMode] = useState<boolean>(false);

  const changeDirectionalLightIntensity = (value: number) => setDirectionalLightIntensity(value);
  const changeSpotLightIntensity = (value: number) => setSpotLightIntensity(value);

  const setModelPlaying = (value: boolean) => {
    setIsModelPlaying(value);
  };

  const toggleModelShadow = () => {
    if (isModelShadowOn) {
      // switch to false -> turn off shadow mode
      setIsContactShadowMode(false);
      setIsGroundShadowMode(false);
    } else {
      // switch to true -> turn on shadow mode with default value
      setIsContactShadowMode(true);
      setIsGroundShadowMode(false);
    }

    setIsModelShadowOn((prev) => !prev);
  };

  const toggleContactShadowMode = () => {
    if (isContactShadowMode) return;
    setIsGroundShadowMode(false);
    setIsContactShadowMode((prev) => !prev);
  };

  const toggleGroundShadowMode = () => {
    if (isGroundShadowMode) return;
    setIsContactShadowMode(false);
    setIsGroundShadowMode((prev) => !prev);
  };

  const value: TThreeDToolsContext = useMemo(
    () => ({
      animations,
      setAnimations,
      directionalLightIntensity,
      changeDirectionalLightIntensity,
      spotLightIntensity,
      changeSpotLightIntensity,
      isModelShadowOn,
      toggleModelShadow,
      isContactShadowMode,
      toggleContactShadowMode,
      isGroundShadowMode,
      toggleGroundShadowMode,
      isModelPlaying,
      setModelPlaying
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      animations,
      directionalLightIntensity,
      spotLightIntensity,
      isModelShadowOn,
      isContactShadowMode,
      isGroundShadowMode,
      isModelPlaying
    ]
  );
  return <ThreeDToolsContext.Provider value={value}>{children}</ThreeDToolsContext.Provider>;
};

const useThreeDToolsContext = () => useContext(ThreeDToolsContext);

export { ThreeDToolsProvider, useThreeDToolsContext };
