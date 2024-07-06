import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./darkMode.css";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);

reportWebVitals();
