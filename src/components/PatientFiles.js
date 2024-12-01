import React, { useState } from 'react';

const PatientFiles = ({ patients, onBack }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientId: 1,
      date: '2024-12-01',
      reason: 'Follow-up Checkup',
    },
    {
      id: 2,
      patientId: 2,
      date: '2024-12-05',
      reason: 'Annual Physical',
    },
  ]);
  const [showAppointmentsPopup, setShowAppointmentsPopup] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', reason: '' });

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
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

  const handleAddAppointment = () => {
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      { id: Date.now(), patientId: selectedPatient.id, ...newAppointment },
    ]);
    setNewAppointment({ date: '', reason: '' });
  };

  const handleEditAppointment = (id, type, value) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, [type]: value } : appointment
      )
    );
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div style={styles.container}>
      {selectedPatient ? (
        <div style={styles.patientDetails}>
          <h2>Patient Record: {selectedPatient.name}</h2>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} style={styles.fileInput} />
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
                {appointments
                  .filter((appointment) => appointment.patientId === selectedPatient.id)
                  .map((appointment) => (
                    <li key={appointment.id} style={styles.listItem}>
                      <p>Date: {appointment.date}</p>
                      <p>Reason: {appointment.reason}</p>
                      <div>
                        <label>
                          Reschedule:
                          <input
                            type="date"
                            value={appointment.date}
                            onChange={(e) =>
                              handleEditAppointment(appointment.id, 'date', e.target.value)
                            }
                            style={styles.input}
                          />
                        </label>
                        <button
                          style={styles.cancelButton}
                          onClick={() => handleDeleteAppointment(appointment.id)}
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
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    style={styles.input}
                  />
                </label>
                <label>
                  Reason:
                  <input
                    type="text"
                    value={newAppointment.reason}
                    onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
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
  container: {
    padding: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '0.5rem',
    margin: '0.5rem 0',
    backgroundColor: '#e6edea',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    
  },
  patientDetails: {
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  fileInput: {
    marginTop: '1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#6b8f71',
    color: '#f4f7f5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    
    
  },
  popup: {
    position: 'absolute',
    top: '20%',
    left: '30%',
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '1rem',
    zIndex: 1000,
  },
  newAppointment: {
    marginTop: '1rem',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.5rem',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '1rem',
  },
};

export default PatientFiles;
