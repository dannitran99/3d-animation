/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from 'react';

type TKeyBindingProps = {
  handleKeyDown?: Record<KeyboardEvent['key'], (event: KeyboardEvent) => void>;
  handleKeyUp?: Record<KeyboardEvent['key'], (event: KeyboardEvent) => void>;
};

export const useKeyBinding = ({ handleKeyDown, handleKeyUp }: TKeyBindingProps) => {
  // Implementation of the useKeyBinding hook
  useEffect(() => {
    if (!handleKeyDown) {
      return;
    }
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      const key = event.key;
      const keyHandler = handleKeyDown[key] || handleKeyDown[key.toUpperCase()];
      keyHandler && keyHandler(event);
    };

    window.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!handleKeyUp) {
      return;
    }

    const handleKeyUpEvent = (event: KeyboardEvent) => {
      const key = event.key;
      const keyHandler = handleKeyUp[key] || handleKeyUp[key.toUpperCase()];
      keyHandler && keyHandler(event);
    };

    window.addEventListener('keyup', handleKeyUpEvent);

    return () => {
      window.removeEventListener('keyup', handleKeyUpEvent);
    };
  }, [handleKeyUp]);
};
