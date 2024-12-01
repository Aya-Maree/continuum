import React from 'react';
import Map from "./Map/Map";

const Physician = () => {
  const feeds = [
    { icon: '👤', title:  'Patient Information Uploaded', time: '3 mins' },
    { icon: '🔔', title: 'Clinic Update', time: '10 mins' },
    { icon: '👥', title: 'Patient Update', time: '16 mins' },
    { icon: '💬', title: 'New Message from Patient', time: '19 mins' },
  ];

  return (
    <div className="dashboard-container" style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>continuum</h1>
        <p>Welcome, <span style={styles.highlight}>Physician John Doe</span></p>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Dashboard Tiles */}
        <div style={styles.tilesContainer}>
          <div style={styles.tile}>
            <h2>Clinic Navigation</h2>
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
            <Map/>
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
  sidebar: {
    backgroundColor: '#e6edea', // Light sage green
    width: '15%',
    padding: '1rem',
    float: 'left',
    color: '#2f4f4f', // Evergreen text
  },
  navItem: {
    margin: '0.5rem 0',
  },
  main: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#f9fbf9', // Very light sage
  },
  tilesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  tile: {
    backgroundColor: '#6b8f71', // Sage green
    color: '#f4f7f5', // Light sage text
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    flex: 1,
    margin: '0 0.5rem',
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
};

export default Physician;
