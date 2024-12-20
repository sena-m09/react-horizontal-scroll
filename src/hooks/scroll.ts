import { useEffect, useState, useCallback } from "react";

import { throttle } from "throttle-debounce";

type HorizontalScrollState = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export const useHorizontalScrollState = <
  T extends HTMLElement = HTMLElement
>(): {
  refCallback: (node: T | null) => void;
  state: HorizontalScrollState;
  scrollBarHeight: number;
} => {
  const [element, setElement] = useState<T | null>(null);
  const [scrollBarHeight, setScrollBarHeight] = useState(0);
  const [state, setState] = useState<HorizontalScrollState>({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const updateScrollBarHeight = useCallback(() => {
    if (!element) return;
    setScrollBarHeight(element.offsetHeight - element.clientHeight);
  }, [element]);

  const updateScrollState = useCallback(() => {
    if (!element) return;
    const { scrollLeft, clientWidth, scrollWidth } = element;
    setState({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft + clientWidth < scrollWidth,
    });
  }, [element]);

  const handleScroll = useCallback(
    throttle(100, updateScrollState),
    [updateScrollState]
  );

  useEffect(() => {
    if (!element) return undefined;

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
      updateScrollBarHeight();
    });
    resizeObserver.observe(element);

    element.addEventListener("scroll", handleScroll);

    updateScrollBarHeight();
    updateScrollState();

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener("scroll", handleScroll);
    };
  }, [element, updateScrollState, updateScrollBarHeight]);

  return { refCallback: setElement, state, scrollBarHeight };
};
