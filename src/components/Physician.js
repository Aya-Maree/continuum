import React, { useState } from 'react';
import PatientFiles from './PatientFiles';

const Physician = () => {
  const [showPatientFiles, setShowPatientFiles] = useState(false);

  const patients = [
    { id: 1, name: 'Alice Smith', record: 'Record 1' },
    { id: 2, name: 'Bob Johnson', record: 'Record 2' },
    { id: 3, name: 'Charlie Davis', record: 'Record 3' },
  ];

  const feeds = [
    { icon: '👤', title: 'Patient Information Uploaded', time: '3 mins' },
    { icon: '🔔', title: 'Clinic Update', time: '10 mins' },
    { icon: '👥', title: 'Patient Update', time: '16 mins' },
    { icon: '💬', title: 'New Message from Patient', time: '19 mins' },
  ];

  const handleNavigateToPatientFiles = () => {
    setShowPatientFiles(true);
  };

  const handleBackToDashboard = () => {
    setShowPatientFiles(false);
  };

  return (
    <div className="dashboard-container" style={styles.container}>
      {showPatientFiles ? (
        <PatientFiles patients={patients} onBack={handleBackToDashboard} />
      ) : (
        <>
          {/* Header */}
          <header style={styles.header}>
            <h1>continuum</h1>
            <p>
              Welcome, <span style={styles.highlight}>Physician John Doe</span>
            </p>
          </header>

          {/* Main Content */}
          <main style={styles.main}>
            {/* Dashboard Tiles */}
            <div style={styles.tilesContainer}>
              <div style={styles.tile}>
                <h2>Clinic Navigation</h2>
                <p>Navigate through clinic-specific options here.</p>
              </div>
              <div style={styles.tile}>
                <h2>View Patient Files</h2>
                <button
                  style={styles.button}
                  onClick={handleNavigateToPatientFiles}
                >
                  Open Patient Files
                </button>
              </div>
            </div>

            {/* Feeds and Regions */}
            <div style={styles.feedsRegions}>
              <div style={styles.feeds}>
                <h2>Feeds</h2>
                <ul style={styles.feedList}>
                  {feeds.map((feed, index) => (
                    <li key={index} style={styles.feedItem}>
                      <span style={styles.feedIcon}>{feed.icon}</span>
                      <span>{feed.title}</span>
                      <span style={styles.feedTime}>{feed.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={styles.region}>
                <h2>Regions</h2>
                <p>Google Regional Map</p>
              </div>
            </div>
          </main>

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
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    backgroundColor: '#f4f7f5', // Light sage background
  },
  header: {
    backgroundColor: '#2f4f4f', // Dark evergreen
    color: '#f4f7f5', // Light sage text
    padding: '1rem',
    textAlign: 'center',
  },
  highlight: {
    color: '#9abf88', // Sage green accent
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#f9fbf9', // Very light sage
  },
  tilesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
  },
  tile: {
    backgroundColor: '#6b8f71', // Sage green
    color: '#f4f7f5', // Light sage text
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  feedsRegions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  feeds: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    marginRight: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: '#2f4f4f', // Evergreen text
  },
  feedList: {
    listStyle: 'none',
    padding: 0,
  },
  feedItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
  },
  feedIcon: {
    marginRight: '0.5rem',
    color: '#6b8f71', // Sage green icons
  },
  feedTime: {
    color: '#888',
    fontSize: '0.8rem',
  },
  region: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: '#2f4f4f', // Evergreen text
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#2f4f4f', // Dark evergreen
    color: '#f4f7f5', // Light sage
    padding: '1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#9abf88',
    color: '#f4f7f5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Physician;
