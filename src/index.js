import React from "react";
import reactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import 'font-awesome/css/font-awesome.min.css'; 
import './index.css'
import App from './components/app';


reactDOM.render(
  <main className="container">
    
    <div>
      <BrowserRouter>      
        <App / >
      </BrowserRouter>
    </div>
  </main>,
  document.getElementById("root")
);
