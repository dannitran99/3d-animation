import {
  createContext,
  type Dispatch,
  type MutableRefObject,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState} from 'react';
import type { AnimationClip } from 'three';

import { FRAME_BACKGROUND_COLOR_PICKER, WIRE_FRAME_COLOR_PICKER } from '../constants';
import type { TColorPicker } from '../type';

 
type TThreeDToolsContext = {
  isBoundingBoxOn: boolean;
  toggleBoundingBoxMode: () => void;
  isAxesHelperOn: boolean;
  toggleAxesHelperMode: () => void;
  isWireFrameOn: boolean;
  toggleWireFrameMode: () => void;
  isWithMaterial: boolean;
  toggleIsWithMaterial: () => void;
  wireFrameColor: TColorPicker;
  changeWireFrameColor: (value: TColorPicker) => void;
  backgroundColor: TColorPicker;
  changeBackgroundColor: (value: TColorPicker) => void;
  directionalLightIntensity: number;
  changeDirectionalLightIntensity: (value: number) => void;
  spotLightIntensity: number;
  changeSpotLightIntensity: (value: number) => void;
  animations: AnimationClip[] | [];
  setAnimations: Dispatch<SetStateAction<AnimationClip[]>>;
  currentAnimationIndex: number;
  changeAnimation: (value: number) => void;
  animationPlaySpeed: number;
  changeAnimationPlaySpeed: (value: number) => void;
  isModelShadowOn: boolean;
  toggleModelShadow: () => void;
  isContactShadowMode: boolean;
  toggleContactShadowMode: () => void;
  isGroundShadowMode: boolean;
  toggleGroundShadowMode: () => void;
  isBoneOn: boolean;
  toggleBoneMode: () => void;
  isBoneInfluenceOn: boolean;
  toggleBoneInfluenceMode: () => void;
  isModelPlaying: boolean;
  setModelPlaying: (value: boolean) => void;
  progressRef: MutableRefObject<number>;
};

const initThreeDToolsContextValue: TThreeDToolsContext = {
  isBoundingBoxOn: false,
  toggleBoundingBoxMode: () => {},
  isAxesHelperOn: false,
  toggleAxesHelperMode: () => {},
  isWireFrameOn: false,
  toggleWireFrameMode: () => {},
  isWithMaterial: false,
  toggleIsWithMaterial: () => {},
  wireFrameColor: WIRE_FRAME_COLOR_PICKER[0],
  changeWireFrameColor: () => {},
  backgroundColor: FRAME_BACKGROUND_COLOR_PICKER[0],
  changeBackgroundColor: () => {},
  directionalLightIntensity: 1,
  changeDirectionalLightIntensity: () => {},
  spotLightIntensity: 1,
  changeSpotLightIntensity: () => {},
  animations: [],
  setAnimations: () => {},
  currentAnimationIndex: 0,
  changeAnimation: () => {},
  animationPlaySpeed: 1,
  changeAnimationPlaySpeed: () => {},
  isModelShadowOn: false,
  toggleModelShadow: () => {},
  isContactShadowMode: false,
  toggleContactShadowMode: () => {},
  isGroundShadowMode: false,
  toggleGroundShadowMode: () => {},
  isBoneOn: false,
  toggleBoneMode: () => {},
  isBoneInfluenceOn: false,
  toggleBoneInfluenceMode: () => {},
  isModelPlaying: false,
  setModelPlaying: () => {},
  progressRef: { current: 0 }
};

const ThreeDToolsContext = createContext<TThreeDToolsContext>(initThreeDToolsContextValue);

type TThreeDToolsProviderProps = {
  children: ReactNode;
};

const ThreeDToolsProvider = ({ children }: TThreeDToolsProviderProps) => {
  const [isBoundingBoxOn, setIsBoundingBoxOn] = useState<boolean>(false);
  const [isAxesHelperOn, setIsAxesHelperOn] = useState<boolean>(false);
  const [isWireFrameOn, setIsWireFrameOn] = useState<boolean>(false);
  const [isWithMaterial, setIsWithMaterial] = useState<boolean>(false);
  const [wireFrameColor, setWireFrameColor] = useState<TColorPicker>(WIRE_FRAME_COLOR_PICKER[0]);
  const [backgroundColor, setBackgroundColor] = useState<TColorPicker>(
    FRAME_BACKGROUND_COLOR_PICKER[0]
  );
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState<number>(1);
  const [spotLightIntensity, setSpotLightIntensity] = useState<number>(1);

  const [animations, setAnimations] = useState<AnimationClip[]>([]);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState<number>(0);
  const [animationPlaySpeed, setAnimationPlaySpeed] = useState<number>(1);

  const [isModelShadowOn, setIsModelShadowOn] = useState<boolean>(false);
  const [isContactShadowMode, setIsContactShadowMode] = useState<boolean>(false);
  const [isGroundShadowMode, setIsGroundShadowMode] = useState<boolean>(false);
  const [isBoneOn, setIsBoneOn] = useState<boolean>(false);
  const [isBoneInfluenceOn, setIsBoneInfluenceOn] = useState<boolean>(false);
  const [isModelPlaying, setIsModelPlaying] = useState<boolean>(false);
  const progressRef = useRef<number>(0);

  const toggleWireFrameMode = () => {
    if (isWireFrameOn) {
      setWireFrameColor(WIRE_FRAME_COLOR_PICKER[0]);
      setIsWithMaterial(false);
    }
    setIsWireFrameOn((prev) => !prev);
  };

  const changeWireFrameColor = (value: TColorPicker) => setWireFrameColor(value);

  const toggleIsWithMaterial = () => setIsWithMaterial((prev) => !prev);

  const toggleBoundingBoxMode = () => setIsBoundingBoxOn((prev) => !prev);

  const toggleAxesHelperMode = () => setIsAxesHelperOn((prev) => !prev);

  const changeBackgroundColor = (value: TColorPicker) => setBackgroundColor(value);

  const changeDirectionalLightIntensity = (value: number) => setDirectionalLightIntensity(value);

  const changeSpotLightIntensity = (value: number) => setSpotLightIntensity(value);

  const changeAnimationPlaySpeed = (value: number) => setAnimationPlaySpeed(value);

  const changeAnimation = (value: number) => setCurrentAnimationIndex(value);

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

  const toggleBoneMode = () => {
    setIsBoneOn((prev) => {
      const newValue = !prev;
      if (newValue) {
        setIsBoneInfluenceOn(false);
      }
      return newValue;
    });
  };
  const toggleBoneInfluenceMode = () =>
    setIsBoneInfluenceOn((prev) => {
      const newValue = !prev;
      if (newValue) {
        setIsBoneOn(false);
      }
      return newValue;
    });

  const setModelPlaying = (value: boolean) => {
    setIsModelPlaying(value);
  };

  const value: TThreeDToolsContext = useMemo(
    () => ({
      backgroundColor,
      changeBackgroundColor,
      isAxesHelperOn,
      toggleAxesHelperMode,
      isBoundingBoxOn,
      toggleBoundingBoxMode,
      isWireFrameOn,
      toggleWireFrameMode,
      isWithMaterial,
      toggleIsWithMaterial,
      wireFrameColor,
      changeWireFrameColor,
      directionalLightIntensity,
      changeDirectionalLightIntensity,
      spotLightIntensity,
      changeSpotLightIntensity,
      animations,
      setAnimations,
      currentAnimationIndex,
      changeAnimation,
      animationPlaySpeed,
      changeAnimationPlaySpeed,
      isModelShadowOn,
      toggleModelShadow,
      isContactShadowMode,
      toggleContactShadowMode,
      isGroundShadowMode,
      toggleGroundShadowMode,
      isBoneOn,
      toggleBoneMode,
      isBoneInfluenceOn,
      toggleBoneInfluenceMode,
      isModelPlaying,
      setModelPlaying,
      progressRef
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      backgroundColor,
      isAxesHelperOn,
      isBoundingBoxOn,
      isWireFrameOn,
      wireFrameColor,
      isWithMaterial,
      directionalLightIntensity,
      spotLightIntensity,
      animations,
      animationPlaySpeed,
      currentAnimationIndex,
      isModelShadowOn,
      isContactShadowMode,
      isGroundShadowMode,
      isBoneOn,
      isBoneInfluenceOn,
      isModelPlaying,
      progressRef
    ]
  );
  return <ThreeDToolsContext.Provider value={value}>{children}</ThreeDToolsContext.Provider>;
};

const useThreeDToolsContext = () => useContext(ThreeDToolsContext);

export { ThreeDToolsProvider, useThreeDToolsContext };
