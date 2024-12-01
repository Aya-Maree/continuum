import React, { useState, useEffect } from 'react';

const PatientFiles = ({ onBack }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentsPopup, setShowAppointmentsPopup] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // For new EMR upload form
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    file: null,
  });

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:4000/patients');
        if (!response.ok) throw new Error('Failed to fetch patients');
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load patients.');
      }
    };
    fetchPatients();
  }, []);

  const handlePatientClick = async (patient) => {
    setSelectedPatient(patient);
    try {
      const response = await fetch(
        `http://localhost:4000/appointments/patient/${patient.id}`
      );
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load appointments.');
    }
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setAppointments([]);
  };

  const handleFileUploadChange = (e) => {
    setNewPatient((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newPatient.file) {
      alert('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newPatient.name);
    formData.append('age', newPatient.age);
    formData.append('gender', newPatient.gender);
    formData.append('email', newPatient.email);
    formData.append('file', newPatient.file);

    try {
      const response = await fetch('http://localhost:4000/patients', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload patient data');
      alert('Patient record uploaded successfully!');
      setNewPatient({ name: '', age: '', gender: '', email: '', file: null });
    } catch (err) {
      console.error(err);
      alert('Error uploading patient record.');
    }
  };

  const handleAddAppointment = async () => {
    if (!newAppointment.date || !newAppointment.reason) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: selectedPatient.id,
          date: newAppointment.date,
          reason: newAppointment.reason,
        }),
      });
      if (!response.ok) throw new Error('Failed to add appointment');
      const data = await response.json();
      setAppointments((prevAppointments) => [...prevAppointments, data]);
      setNewAppointment({ date: '', reason: '' });
      alert('Appointment added successfully!');
    } catch (err) {
      console.error(err);
      alert('Unable to add appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!selectedPatient ? (
        <div>
          <h2>Patient List</h2>
          <ul>
            {patients.map((patient) => (
              <li key={patient.id} onClick={() => handlePatientClick(patient)}>
                {patient.name}
              </li>
            ))}
          </ul>
          <h2>Upload New Patient Record</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={newPatient.age}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={newPatient.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={newPatient.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              File:
              <input
                type="file"
                accept=".pdf,.dicom,.csv"
                onChange={handleFileUploadChange}
                required
              />
            </label>
            <button type="submit">Upload</button>
          </form>
          <button onClick={onBack}>Back to Dashboard</button>
        </div>
      ) : (
        <div>
          <h2>Patient Record: {selectedPatient.name}</h2>
          <button onClick={handleBackToList}>Back to Patient List</button>
          <div>
            <h3>Appointments</h3>
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment._id}>
                  {appointment.date} - {appointment.reason}
                </li>
              ))}
            </ul>
            <div>
              <h4>Add Appointment</h4>
              <label>
                Date:
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, date: e.target.value })
                  }
                />
              </label>
              <label>
                Reason:
                <input
                  type="text"
                  value={newAppointment.reason}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, reason: e.target.value })
                  }
                />
              </label>
              <button onClick={handleAddAppointment}>Add Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientFiles;
