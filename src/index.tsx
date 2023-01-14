import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExchangeRateProvider } from "./context/ExchangeRateProvider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ExchangeRateProvider>
    <App />
  </ExchangeRateProvider>
);
