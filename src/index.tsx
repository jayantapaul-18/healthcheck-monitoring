import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Link } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HealthCheckMonitor from './components/HealthCheckMonitor';
import TargetUrlConfig from './components/TargetUrlConfig';

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<HealthCheckMonitor />} />
        <Route path="/target-url-config" element={<TargetUrlConfig />} />
      <Route
      path="/error"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here! @ { new Date().toLocaleTimeString()}</p>
        </main>
      }
    />
        </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
