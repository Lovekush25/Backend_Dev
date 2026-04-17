import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(onIntersect, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) onIntersect();
      },
      { threshold: 0.7, ...options }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [onIntersect, options]);

  return ref;
}