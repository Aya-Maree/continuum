import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Clinic from './components/Clinic';
import Coordinator from './components/Coordinator';
import Patient from './components/Patient';
import Physician from './components/Physician';
import PatientFiles from './components/PatientFiles';

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clinics" element={<Clinic />} />
        <Route path="/coordinators" element={<Coordinator />} />
        <Route path="/patients" element={<Patient />} />
        <Route path="/physicians" element={<Physician />} />
      </Routes>
    </div>
  </Router>
);

export default App;
