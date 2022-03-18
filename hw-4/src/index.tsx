import React from "react";

import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";

import "@config/configureMobX";
import "antd/dist/antd.css";
import "@styles/root.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
