/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import "simple-line-icons/scss/simple-line-icons.scss";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
