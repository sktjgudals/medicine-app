import { useState, useEffect, useCallback } from "react";

const defaultOption = {
  root: null,
  rootMargin: "0px 0px 20px 0px",
  threshold: 0,
};

const useInfiniteScroll = (onIntersect: any, option = defaultOption) => {
  const [ref, setRef] = useState<any>();
  const checkIntersect = useCallback(
    ([entry]: any[], observer: any) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect]
  );
  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, option);
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option, checkIntersect]);
  return [ref, setRef];
};

export default useInfiniteScroll;
