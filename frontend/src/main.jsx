import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProviderRoot } from "./authConfig";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderRoot>
      <App />
    </AuthProviderRoot>
  </React.StrictMode>
);
