import { useEffect, useRef } from 'react';

import type { TUsePressedKeys } from '../type';

export const usePressedKeys = ({ keys }: TUsePressedKeys) => {
  const pressedKeysRef = useRef(new Set<string>());
  const keysSignature = keys.join(',');

  useEffect(() => {
    const pressedKeys = pressedKeysRef.current;
    const allowedKeys = new Set(keys);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!allowedKeys.has(event.key)) return;
      event.preventDefault();
      pressedKeys.add(event.key);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key);
    };

    const handleWindowBlur = () => pressedKeys.clear();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      pressedKeys.clear();
    };
  }, [keys, keysSignature]);

  return pressedKeysRef;
};
