import React from 'react';

const Clinic = () => {
  const feeds = [
    { icon: '👤', title: 'New Patient Record', time: '15 min' },
    { icon: '🔔', title: 'Physician Update', time: '21 min' },
    { icon: '👥', title: 'New Patient Record', time: '22 min' },
    { icon: '💬', title: 'New Patient Message', time: '26 min' },
    { icon: '🔖', title: 'Check Information for Patient X', time: '32 min' },
    { icon: '💻', title: 'Database Update', time: '35 min' },
    { icon: '🔗', title: 'New Shared Information', time: '45 min' },
  ];

  return (
    <div className="dashboard-container" style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>continuum</h1>
        <p>Welcome, <span style={styles.highlight}>Clinic</span></p>
      </header>

      {/* Sidebar */}
      <nav style={styles.sidebar}>
        <ul>
          <li style={styles.navItem}><a href="/overview">Overview</a></li>
          <li style={styles.navItem}><a href="/general">General</a></li>
          <li style={styles.navItem}><a href="/history">History</a></li>
          <li style={styles.navItem}><a href="/settings">Settings</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Dashboard Tiles */}
        <div style={styles.tilesContainer}>
          <div style={styles.tile}>
            <h2>Messages</h2>
          </div>
          <div style={styles.tile}>
            <h2>Incoming Patients</h2>
          </div>
          <div style={styles.tile}>
            <h2>OMS</h2>
          </div>
          <div style={styles.tile}>
            <h2>Training Tracking</h2>
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
    color: '#f4f7f5', // Light sage
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
    padding: '1rem',
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
  },
  feedList: {
    listStyle: 'none',
    padding: 0,
  },
  feedItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    color: '#2f4f4f', // Evergreen text
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
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#2f4f4f', // Dark evergreen
    color: '#f4f7f5', // Light sage
    padding: '1rem',
  },
};

export default Clinic;
