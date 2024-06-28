// 반응형

import { useCallback, useEffect, useRef, useState } from 'react';

type ScollDirection = 'UP' | 'DOWN';

export const useSpyElem = (elemHieght: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = useState(0);

  const prevScrollTop = useRef(0);
  const prevDirection = useRef<ScollDirection>('DOWN');

  const transitionPoint = useRef(elemHieght);

  const onScroll = useCallback(() => {
    const currentScrollTop =
      document?.documentElement?.scrollTop || document?.body?.scrollTop || 0;
    const nextDirection =
      prevScrollTop.current > currentScrollTop ? 'UP' : 'DOWN';

    const isUpTransition =
      prevDirection.current === 'DOWN' && nextDirection === 'UP';
    const isDownTransition =
      prevDirection.current === 'UP' && nextDirection === 'DOWN';

    const NextBottomPoint = currentScrollTop + elemHieght;

    if (isUpTransition && transitionPoint.current < currentScrollTop) {
      transitionPoint.current = prevScrollTop.current;
    }

    if (isDownTransition && NextBottomPoint < transitionPoint.current) {
      transitionPoint.current = prevScrollTop.current + elemHieght;
    }

    const newMargin = Math.min(
      0,
      Math.max(-elemHieght, transitionPoint.current - NextBottomPoint),
    );
    setMarginTop(newMargin);

    prevDirection.current = nextDirection;
    prevScrollTop.current = currentScrollTop;
  }, [elemHieght]);

  useEffect(() => {
    const scrollTop =
      document.documentElement?.scrollTop || document.body.scrollTop;
    transitionPoint.current = scrollTop + elemHieght;
    prevScrollTop.current = scrollTop;
  }, [elemHieght]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return { ref, marginTop };
};
