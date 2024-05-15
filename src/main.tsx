import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import AuthContext from "./Context/AuthContext.tsx";
import { APIcontextProvider } from "./Context/baseUrl.tsx";
import { ToastContextProvider } from "./Context/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <APIcontextProvider>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </APIcontextProvider>
  </React.StrictMode>
);
