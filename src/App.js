import React, { useState } from "react";
import Header from "./Components/Header";
import "./style/styles.css";
import "./style/toast_styles.css";

import { Toast, useToastControls } from "./Toasts";

function App() {
  const [_state, setState] = useState({});
  const { show, close, closeAll } = useToastControls();

  return (
    <div className="app">
    <Header />
      <ul className="controls-list">
        <li>
          <button onClick={() => show("toast-first")}>ROI</button>
          <button onClick={() => close("toast-first")}>
            X
          </button>
          <Toast uniqueId="toast-first" className="toast-blue">
Return on investment: 	​	  
ROI= 
(Current Value of Investment−Cost of Investment)/Cost of Investment

​	 
​	          </Toast>
        </li>
        <li>
          <button onClick={() => show("toast-second")}>
            Show Second Toast
          </button>
          <button onClick={() => close("toast-second")}>
            X
          </button>
          <Toast
            uniqueId="toast-second"
            className="toast-pink"
          >
            Second Toast
          </Toast>
        </li>
        <li>
          <button onClick={() => show("toast-third")}>Show Third Toast</button>
          <button onClick={() => close("toast-third")}>
            X
          </button>
          <Toast
            uniqueId="toast-third"
            // config={{ role: "alert", duration: 6500 }}
            className="toast-blue"
          >
            {/* Third Toast {Math.random()} */}
          </Toast>
        </li>
        <li>
        {/* re render random toast value */}
          {/* <button onClick={() => setState({})}>Re-render</button> */}
          <button onClick={() => closeAll()}>Close All</button>
        </li>
      </ul>
    </div>
  );
}

export default App;

