import { useEffect, useRef } from 'react';

const useClickOutside = <T extends HTMLElement>(onOutsideClick: () => void, enabled: boolean) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) onOutsideClick();
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [onOutsideClick, enabled]);

  return targetRef;
};

export default useClickOutside;
