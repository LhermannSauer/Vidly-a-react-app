import React from "react";
import reactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app";
import logger from "./components/services/logService";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";

logger.init();

reactDOM.render(
  <main className="container">
    <div>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </main>,
  document.getElementById("root")
);
