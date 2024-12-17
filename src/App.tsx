import { useHorizontalScrollState } from "./hooks/scroll";
import classNames from "classnames";

import './App.css';


function App() {
  const {
    refCallback: horizontalScrollRefCallback,
    state: horizontalScrollState,
    scrollBarHeight,
  } = useHorizontalScrollState<HTMLDivElement>();

  return (
    <>
      <div className={classNames(
        "wrapper",
        horizontalScrollState.canScrollLeft && "-canScrollLeft",
        horizontalScrollState.canScrollRight && "-canScrollRight",
      )}
      style={{ "--scroll-bar-height": `${scrollBarHeight}px` } as React.CSSProperties}
       >
        <div className="container" ref={horizontalScrollRefCallback}>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
    </>
  );
}

export default App;
