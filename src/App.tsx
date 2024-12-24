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
          <table className="table">
            <tbody>
              <tr className="row">
                <th className="box">項目</th>
                <td className="box">テキスト</td>
                <td className="box">テキストテキスト</td>
                <td className="box">テキスト</td>
              </tr>
              <tr className="row">
                <th className="box">項目</th>
                <td className="box">テキスト</td>
                <td className="box">テキストテキスト</td>
                <td className="box">テキスト</td>
              </tr>
              <tr className="row">
                <th className="box">項目</th>
                <td className="box">テキスト</td>
                <td className="box">テキストテキスト</td>
                <td className="box">テキスト</td>
              </tr>
              <tr className="row">
                <th className="box">項目</th>
                <td className="box">テキスト</td>
                <td className="box">テキストテキスト</td>
                <td className="box">テキスト</td>
              </tr>
              <tr className="row">
                <th className="box">項目</th>
                <td className="box">テキスト</td>
                <td className="box">テキストテキスト</td>
                <td className="box">テキスト</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
