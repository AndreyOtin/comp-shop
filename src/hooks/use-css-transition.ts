import { RefObject, useRef } from 'react';

function useCssTransition(ref: RefObject<HTMLElement>, seconds: number) {
  const id = useRef<NodeJS.Timeout>();

  return () => {
    const timerMcs = seconds * 1000;

    clearTimeout(id.current);

    if (!ref.current) {
      return;
    }

    ref.current.style.transition = `all ${seconds}s ease 0s`;
    id.current = setTimeout(() => {
      if (!ref.current) {
        return;
      }

      ref.current.style.transition = '';
    }, timerMcs);
  };
}

export default useCssTransition;
