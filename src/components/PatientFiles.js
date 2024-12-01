import React, { useState, useEffect } from "react";

const PatientFiles = ({ onBack }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentsPopup, setShowAppointmentsPopup] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For new EMR upload form
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    file: null,
  });

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:4000/patients");
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load patients.");
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
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load appointments.");
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
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newPatient.name);
    formData.append("age", newPatient.age);
    formData.append("gender", newPatient.gender);
    formData.append("email", newPatient.email);
    formData.append("file", newPatient.file);

    try {
      const response = await fetch("http://localhost:4000/patients", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload patient data");
      alert("Patient record uploaded successfully!");
      setNewPatient({ name: "", age: "", gender: "", email: "", file: null });
    } catch (err) {
      console.error(err);
      alert("Error uploading patient record.");
    }
  };

  const handleAddAppointment = async () => {
    if (!newAppointment.date || !newAppointment.reason) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatient.id,
          date: newAppointment.date,
          reason: newAppointment.reason,
        }),
      });
      if (!response.ok) throw new Error("Failed to add appointment");
      const data = await response.json();
      setAppointments((prevAppointments) => [...prevAppointments, data]);
      setNewAppointment({ date: "", reason: "" });
      alert("Appointment added successfully!");
    } catch (err) {
      console.error(err);
      alert("Unable to add appointment.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      backgroundColor: "#f4f7f5", // Light sage background
    },
    header: {
      backgroundColor: "#2f4f4f", // Dark evergreen
      color: "#f4f7f5", // Light sage
      padding: "1rem",
      textAlign: "center",
    },
    headers: {
      color: "#2f4f4f",
      textAlign: "center",
      display: "flex",
    },
    highlight: {
      color: "#9abf88", // Sage green accent
      fontWeight: "bold",
    },
    error: {
      color: "red",
      marginBottom: "1rem",
      display: "flex",
    },
    button: {
      backgroundColor: "#6b8f71",
      color: "#f4f7f5",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "1rem",
      maxWidth: "300px",
    },
    buttonSecondary: {
      backgroundColor: "#2f4f4f",
      color: "#f4f7f5",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    list: {
      listStyle: "none",
      padding: "0",
      marginBottom: "1rem",
    },
    listItem: {
      padding: "0.5rem",
      backgroundColor: "#e6edea",
      borderRadius: "8px",
      marginBottom: "0.5rem",
      cursor: "pointer",
      color: "#2f4f4f",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    formRow: {
      display: "flex",
      alignItems: "center",
    },
    formLabel: {
      fontWeight: "bold",
      color: "#2f4f4f",
      maxWidth: "100px",
      marginBottom: "1rem",
    },
    input: {
      flex: "1",
      // maxWidth: "300px",
      padding: "0.5rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      maxWidth: "400px",
    },
    appointmentsList: {
      listStyle: "none",
      padding: "0",
      marginBottom: "1rem",
    },
    appointmentItem: {
      padding: "0.5rem",
      backgroundColor: "#fff",
      borderRadius: "8px",
      marginBottom: "0.5rem",
      color: "#2f4f4f",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#2f4f4f", // Dark evergreen
      color: "#f4f7f5", // Light sage
      padding: "1rem",
    },
  };

  return (
    <div div className="dashboard-container" style={styles.container}>
      <header style={styles.header}>
        <h1>continuum</h1>
        <p>
          Welcome, <span style={styles.highlight}>Clinic</span>
        </p>
      </header>
      {!selectedPatient ? (
        <div>
          <h2 style={styles.headers}>Patient List</h2>
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
          <h2 style={styles.headers}>Upload New Patient Record</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form style={styles.form} onSubmit={handleFormSubmit}>
            <label style={styles.formLabel}>
              Name:
              <input
                type="text"
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </label>
            <label style={styles.formLabel}>
              Age:
              <input
                type="number"
                name="age"
                value={newPatient.age}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </label>
            <label style={styles.formLabel}>
              Gender:
              <select
                name="gender"
                value={newPatient.gender}
                onChange={handleInputChange}
                style={styles.input}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label style={styles.formLabel}>
              Email:
              <input
                type="email"
                name="email"
                value={newPatient.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.formLabel}>
              File:
              <input
                type="file"
                accept=".pdf,.dicom,.csv"
                onChange={handleFileUploadChange}
                style={styles.input}
                required
              />
            </label>
            <button type="submit" style={styles.button}>
              Upload
            </button>
          </form>
          <button onClick={onBack} style={styles.buttonSecondary}>
            Back to Dashboard
          </button>
        </div>
      ) : (
        <div>
          <h2 style={styles.header}>Patient Record: {selectedPatient.name}</h2>
          <button onClick={handleBackToList} style={styles.buttonSecondary}>
            Back to Patient List
          </button>
          <div>
            <h3>Appointments</h3>
            <ul style={styles.appointmentsList}>
              {appointments.map((appointment) => (
                <li key={appointment._id} style={styles.appointmentItem}>
                  {appointment.date} - {appointment.reason}
                </li>
              ))}
            </ul>
            <div>
              <h4>Add Appointment</h4>
              <label style={styles.formLabel}>
                Date:
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </label>
              <label style={styles.formLabel}>
                Reason:
                <input
                  type="text"
                  value={newAppointment.reason}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      reason: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </label>
              <button onClick={handleAddAppointment} style={styles.button}>
                Add Appointment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer style={styles.footer}>
        <div>
          <h3>Demographic</h3>
          <p>Language</p>
          <p>Country</p>
          <p>City</p>
        </div>
        <div>
          <h3>System</h3>
          <p>Browser</p>
          <p>OS</p>
          <p>More</p>
        </div>
        <div>
          <h3>Target</h3>
          <p>Users</p>
          <p>Active</p>
          <p>Geo</p>
          <p>Interests</p>
        </div>
      </footer>
    </div>
  );
};

export default PatientFiles;
