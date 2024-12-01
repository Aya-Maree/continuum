import React, { useState, useEffect } from 'react';

const PatientFiles = ({ onBack }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentsPopup, setShowAppointmentsPopup] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    alert(`${file.name} uploaded successfully!`);
  };

  const handleViewAppointments = () => {
    setShowAppointmentsPopup(true);
  };

  const handleCloseAppointmentsPopup = () => {
    setShowAppointmentsPopup(false);
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

  const handleEditAppointment = async (id, type, value) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id ? { ...appointment, [type]: value } : appointment
      )
    );
    // Optionally update appointment in the backend
  };

  const handleDeleteAppointment = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/appointments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete appointment');
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
      alert('Appointment deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Unable to delete appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      {selectedPatient ? (
        <div style={styles.patientDetails}>
          <h2>Patient Record: {selectedPatient.name}</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            style={styles.fileInput}
          />
          <button style={styles.button} onClick={handleViewAppointments}>
            View Upcoming Appointments
          </button>
          <button style={styles.button} onClick={handleBackToList}>
            Back to Patient List
          </button>

          {showAppointmentsPopup && (
            <div style={styles.popup}>
              <h3>Upcoming Appointments</h3>
              <ul style={styles.list}>
                {appointments.map((appointment) => (
                  <li key={appointment._id} style={styles.listItem}>
                    <p>Date: {appointment.date}</p>
                    <p>Reason: {appointment.reason}</p>
                    <div>
                      <label>
                        Reschedule:
                        <input
                          type="date"
                          value={appointment.date}
                          onChange={(e) =>
                            handleEditAppointment(
                              appointment._id,
                              'date',
                              e.target.value
                            )
                          }
                          style={styles.input}
                        />
                      </label>
                      <button
                        style={styles.cancelButton}
                        onClick={() => handleDeleteAppointment(appointment._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={styles.newAppointment}>
                <h4>New Appointment</h4>
                <label>
                  Date:
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
                    style={styles.input}
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
                    style={styles.input}
                  />
                </label>
                <button style={styles.button} onClick={handleAddAppointment}>
                  Add Appointment
                </button>
              </div>
              <button style={styles.button} onClick={handleCloseAppointmentsPopup}>
                Close
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Patient List</h2>
          <ul style={styles.list}>
            {patients.map((patient) => (
              <li
                key={patient.id}
                style={styles.listItem}
                onClick={() => handlePatientClick(patient)}
              >
                {patient.name}
              </li>
            ))}
          </ul>
          <button style={styles.button} onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  // Keep styles from your original code
  error: {
    color: '#e53e3e',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
};

export default PatientFiles;
