import { useEffect, useRef } from 'react';

const useIntersectionObserver = (onIntersect: () => void, enabled: boolean) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!enabled || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect();
      },
      { rootMargin: '0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return targetRef;
};

export default useIntersectionObserver;
