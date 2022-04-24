import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { Link, useNavigate } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Button } from 'antd';
import HealthCheckMonitor from './components/HealthCheckMonitor';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
        {/* <Button type="link" onClick={() =>  navigate('/')}>APP</Button> */}
        <BrowserRouter>
        {/* <Button type="link" onClick={() =>  navigate('/healthcheck')}>Health Check Monitor</Button> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
