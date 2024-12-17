import { useEffect, useState, useCallback } from "react";

import { throttle } from "throttle-debounce";

export interface HorizontalScrollState {
  scrollLeft: number;
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

  const refCallback = useCallback((node: T | null) => {
    if (node) {
      setElement(node);
    }
  }, []);

  const [scrollBarHeight, setScrollBarHeight] = useState(() => {
    return element
      ? (element.offsetHeight ?? 0) - (element.clientHeight ?? 0)
      : 0;
  });
  const [state, setState] = useState<HorizontalScrollState>({
    scrollLeft: 0,
    canScrollLeft: false,
    canScrollRight: false,
  });

  const updateScrollBarHeight = useCallback(() => {
    setScrollBarHeight(
      (element?.offsetHeight ?? 0) - (element?.clientHeight ?? 0)
    );
  }, [element]);

  const updateScrollState = useCallback(() => {
    if (!element) return;
    const { scrollLeft, clientWidth, scrollWidth } = element;
    setState({
      scrollLeft,
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft + clientWidth < scrollWidth,
    });
  }, [element]);

  useEffect(() => {
    if (!element) return undefined;

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
      updateScrollBarHeight();
    });
    resizeObserver.observe(element);

    const handleScroll = throttle(100, () => updateScrollState());
    element.addEventListener("scroll", handleScroll);

    updateScrollState();

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener("scroll", handleScroll);
    };
  }, [element, updateScrollState, updateScrollBarHeight]);

  return { refCallback, state, scrollBarHeight };
};
