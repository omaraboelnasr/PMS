import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import AuthContextProvider from "./modules/SharedModule/components/AuthContext/AuthContext.tsx";
import ApiContextProvider from "./modules/SharedModule/components/ApiContext/ApiContext.tsx";
import ModeContextProvider from "./modules/SharedModule/components/ModeContext/ModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiContextProvider>
        <ModeContextProvider>
          <App />
        </ModeContextProvider>
      </ApiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
