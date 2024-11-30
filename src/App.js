import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Clinic from './components/Clinic';
import Coordinator from './components/Coordinator';
import Patient from './components/Patient';
import Physician from './components/Physician';

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clinics" element={<Clinic />} />
        <Route path="/coordinators" element={<Coordinator />} />
        <Route path="/patients" element={<Patient />} />
        <Route path="/physicians" element={<Physician />} />
      </Routes>
    </div>
  </Router>
);

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <nav>
      <a href="/clinics">Clinics</a> | 
      <a href="/coordinators">Coordinators</a> | 
      <a href="/patients">Patients</a> | 
      <a href="/physicians">Physicians</a>
    </nav>
  </div>
);

export default App;
