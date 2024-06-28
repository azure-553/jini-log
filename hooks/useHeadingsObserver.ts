// 하이라이트

import React, { useEffect, useRef, useState } from 'react';

export const useHeadingsObserver = (query: string) => {
  const observer = useRef<IntersectionObserver>();
  const [activeIdList, setActiveIdList] = useState<string[]>([]);
  const [tempId, setTempId] = useState('');

  useEffect(() => {
    const scrollMarginOption = { rootMargin: '-32px 0 -80px 0' };

    const handleObserver: IntersectionObserverCallback = (enteries) => {
      enteries.forEach((entery) => {
        const targetId = `#${entery.target.id}`;
        if (entery.isIntersecting) {
          setActiveIdList((prev) => [...prev, targetId]);
          setTempId(() => '');
        } else {
          setActiveIdList((prev) => {
            if (prev.length === 1) setTempId(targetId);
            return prev.filter((elem) => elem !== targetId);
          });
        }
      });
    };

    observer.current = new IntersectionObserver(
      handleObserver,
      scrollMarginOption,
    );
    const elements = document.querySelectorAll(query);

    return () => observer.current?.disconnect();
  }, [query]);

  return [...activeIdList, tempId];
};
