import React, { useEffect } from 'react';

export const useWatchTimeout = (
  watch: unknown,
  ms: number,
  callback: () => void,
) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (watch) {
      timeout = setTimeout(callback, ms);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timeout && clearInterval(timeout);
    };
  }, [callback, ms, watch]);
};
