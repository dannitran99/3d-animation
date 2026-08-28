import { clsx } from 'clsx';
import { ChevronDown, CircleCheck, CirclePause, Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { KEYBOARD } from '../../constants';
import { useKeyBinding } from '../../hooks/useKeyBinding';
import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';
import { convertMillisToTime } from '../../utils/convertMillisToTime';
import { formatDigit } from '../../utils/formatDigit';

const PROGRESS_STEP = 3;
const STATIC_POSE_INDEX = -1;
const ANIMATION_SPEEDS = [0.1, 0.5, 1, 2];

export const AnimationTimelineControl = () => {
  const {
    animations,
    currentAnimationIndex,
    isModelPlaying,
    progressRef,
    animationPlaySpeed,
    changeAnimation,
    changeAnimationPlaySpeed,
    setModelPlaying
  } = useThreeDToolsContext();

  const [showAnimation, setShowAnimation] = useState(false);
  const [showCut, setShowCut] = useState(false);
  const [progressUI, setProgressUI] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [timeDisplayUI, setTimeDisplayUI] = useState<string>('00:00 / 00:00');
  const [currentKeyframeIndex, setCurrentKeyframeIndex] = useState<number>(0);

  const keyframeTimes = useMemo(() => {
    if (!animations[currentAnimationIndex]) return [];

    const clip = animations[currentAnimationIndex];
    const allTimes = new Set<number>();

    // Gộp tất cả times từ các tracks
    clip.tracks.forEach((track) => {
      track.times.forEach((time) => allTimes.add(time));
    });

    // Convert sang % progress (0-1)
    const duration = clip.duration;
    return [...allTimes].sort((a, b) => a - b).map((time) => time / duration);
  }, [animations, currentAnimationIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHolding) {
        setProgressUI(progressRef.current);
      }
      if (animations[currentAnimationIndex]) {
        const totalTime = animations[currentAnimationIndex].duration;
        const currentTime = totalTime * progressRef.current;
        setTimeDisplayUI(`${convertMillisToTime(currentTime)} / ${convertMillisToTime(totalTime)}`);

        // Cập nhật current keyframe index
        keyframeTimes.forEach((time, index) => {
          if (
            progressRef.current >= time &&
            (index === keyframeTimes.length - 1 || progressRef.current < keyframeTimes[index + 1])
          ) {
            setCurrentKeyframeIndex(index);
            return;
          }
        });
      }
    }, 30);
    return () => clearInterval(interval);
  }, [animations, currentAnimationIndex, isHolding, isModelPlaying, keyframeTimes, progressRef]);

  const skipTime = (direction: 'forward' | 'backward') => {
    // settimeout to make sure the keydown event is fully processed before updating the state
    setTimeout(() => {
      setIsHolding(true);
      setModelPlaying(false);
      if (animations[currentAnimationIndex]) {
        const total = animations[currentAnimationIndex].duration || 0;
        const progressSkip = PROGRESS_STEP / total;
        if (direction === 'forward') {
          progressRef.current = Math.min(1, progressRef.current + progressSkip);
          setProgressUI(progressRef.current);
        } else {
          progressRef.current = Math.max(0, progressRef.current - progressSkip);
          setProgressUI(progressRef.current);
        }
      }
    }, 0);
  };

  useKeyBinding({
    handleKeyDown: {
      [KEYBOARD.SPACE]: (event) => {
        event.preventDefault();
        setModelPlaying(!isModelPlaying);
      },
      [KEYBOARD.ARROW_LEFT]: (event) => {
        event.preventDefault();
        skipTime('backward');
      },
      [KEYBOARD.ARROW_RIGHT]: (event) => {
        event.preventDefault();
        skipTime('forward');
      },
      [KEYBOARD.ARROW_UP]: (event) => {
        if (showAnimation) {
          event.preventDefault();
          const prevIndex = currentAnimationIndex - 1;
          if (prevIndex < STATIC_POSE_INDEX) return;
          changeAnimation(prevIndex);
        }
        if (showCut) {
          event.preventDefault();
          const prevIndex = currentKeyframeIndex - 1;
          if (prevIndex < 0) return;
          setModelPlaying(false);
          progressRef.current = keyframeTimes[prevIndex];
          setProgressUI(keyframeTimes[prevIndex]);
        }
      },
      [KEYBOARD.ARROW_DOWN]: (event) => {
        if (showAnimation) {
          event.preventDefault();
          const nextIndex = currentAnimationIndex + 1;
          if (nextIndex > animations.length - 1) return;
          changeAnimation(nextIndex);
        }
        if (showCut) {
          event.preventDefault();
          const nextIndex = currentKeyframeIndex + 1;
          if (nextIndex > keyframeTimes.length - 1) return;
          setModelPlaying(false);
          progressRef.current = keyframeTimes[nextIndex];
          setProgressUI(keyframeTimes[nextIndex]);
        }
      }
    },
    handleKeyUp: {
      [KEYBOARD.ARROW_LEFT]: (event) => {
        event.preventDefault();
        setIsHolding(false);
        setModelPlaying(true);
      },
      [KEYBOARD.ARROW_RIGHT]: (event) => {
        event.preventDefault();
        setIsHolding(false);
        setModelPlaying(true);
      }
    }
  });

  const handleClickCut = (val: boolean) => {
    if (val) {
      setShowAnimation(false);
      setModelPlaying(false);
    }
    setShowCut(val);
  };
  const handleClickAnimation = (val: boolean) => {
    if (val) {
      setShowCut(false);
    }
    setShowAnimation(val);
  };

  const animationName =
    currentAnimationIndex === STATIC_POSE_INDEX
      ? 'Static pose'
      : animations[currentAnimationIndex]?.name || '';

  return (
    <>
      <input
        className="animation-playbar"
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={progressUI}
        onMouseDown={() => {
          setModelPlaying(false);
          setIsHolding(true);
        }}
        onMouseUp={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !isModelPlaying && setModelPlaying(true);
          setIsHolding(false);
        }}
        onChange={(e) => {
          const val = Number(e.target.value);
          setProgressUI(val);
          progressRef.current = val; // đồng bộ ref
        }}
      />
      <div className="animation__container flex gap-2">
        <button
          className="animation-action-container"
          onClick={() => setModelPlaying(!isModelPlaying)}
        >
          {isModelPlaying ? <CirclePause size={28} /> : <Play size={28} />}
        </button>
        <div className="animation-action-container px-3">{timeDisplayUI}</div>
      </div>
      <div className="animation__container">
        <button
          className={clsx('animation-action-container', {
            'animation-action-container--selected': showAnimation
          })}
          onClick={() => handleClickAnimation(!showAnimation)}
        >
          <p className="animation-name">{animationName}</p>
          <ChevronDown className="ms-2" />
        </button>
        <div
          className={clsx('control-menu-container', {
            'control-menu-container--show': showAnimation
          })}
        >
          <div className="animation-speed">
            {ANIMATION_SPEEDS.map((speed) => (
              <button
                key={speed}
                className={clsx('animation-speed__option', {
                  'animation-speed__option--selected': speed === animationPlaySpeed
                })}
                onClick={() => changeAnimationPlaySpeed(speed)}
                data-toggle="tooltip"
                data-placement="top"
                title={`Speed x${speed}`}
              >
                x{speed}
              </button>
            ))}
          </div>
          <div className="animation-list custom-scrollbar">
            <button
              className={clsx('animation-item', {
                'animation-item--selected': currentAnimationIndex === STATIC_POSE_INDEX
              })}
              onClick={() => changeAnimation(STATIC_POSE_INDEX)}
            >
              Static pose
              {currentAnimationIndex === STATIC_POSE_INDEX && <CircleCheck size={16} />}
            </button>
            {animations.map((animation, index) => {
              const isSelected = index === currentAnimationIndex;
              return (
                <button
                  key={animation.name}
                  ref={
                    isSelected
                      ? (el) => {
                          if (el) {
                            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                          }
                        }
                      : undefined
                  }
                  className={clsx('animation-item', {
                    'animation-item--selected': isSelected
                  })}
                  onClick={() => changeAnimation(index)}
                >
                  {animation.name}
                  {isSelected && <CircleCheck size={16} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="animation__container">
        <button
          className={clsx('animation-action-container', {
            'animation-action-container--selected': showCut
          })}
          onClick={() => handleClickCut(!showCut)}
        >
          <p className="animation-name">Cut Choice</p>
          <ChevronDown className="ms-2" />
        </button>
        <div
          className={clsx('control-menu-container', {
            'control-menu-container--show': showCut
          })}
        >
          <div className="animation-speed">
            <p className="animation-speed__option mb-0">{`Cut Choice (${keyframeTimes.length})`}</p>
          </div>
          <div className="animation-list custom-scrollbar">
            {keyframeTimes.map((num, index) => {
              const isSelected = currentKeyframeIndex === index;
              return (
                <button
                  key={index}
                  ref={
                    isSelected
                      ? (el) => {
                          if (el) {
                            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                          }
                        }
                      : undefined
                  }
                  className={clsx('animation-item', {
                    'animation-item--selected': isSelected
                  })}
                  onClick={() => {
                    setModelPlaying(false);
                    progressRef.current = num;
                    setProgressUI(num);
                  }}
                >
                  {`${formatDigit(index + 1, 2)}_keyframe`}
                  {isSelected && <CircleCheck size={16} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
