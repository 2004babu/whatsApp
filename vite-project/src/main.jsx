import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store.js";
import { SocketPrivider } from "./Context/SocketPrivider.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <SocketPrivider>

      <HelmetProvider>
        <App />
      </HelmetProvider>
      </SocketPrivider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
