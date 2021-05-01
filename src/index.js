import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import platform from "platform";
import reportWebVitals from "./reportWebVitals";
import "./css/index.css";

const os = platform.os.family;

function ViewPage() {
  if (os === "Windows" || os === "Linux" || os === "macOS") {
    return <App />;
  }
  if (os === "Android") {
    alert("This is a Desktop Site It may not look good in Mobile Devices");
    return <App />;
  }
  if (os === "iOS") {
    alert("This is a Desktop Site It may not look good in Mobile Devices");
    return <App />;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ViewPage />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
