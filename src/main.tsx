import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import ToastContextProvider  from './Context/ToastContext';
import AuthContextProvider from "./Context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
  <AuthContextProvider>
  <ToastContextProvider>
  
  <App />
  </ToastContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
  
);
