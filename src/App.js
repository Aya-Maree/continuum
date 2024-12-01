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
        <Route path="/clinics" element={<Clinic />} />
        <Route path="/coordinators" element={<Coordinator />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/physician" element={<Physician />} />
      </Routes>
    </div>
  </Router>
);

export default App;
