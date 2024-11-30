import React from 'react';

const Patient = () => {
  const feeds = [
    { icon: '👤', title: 'Medical Record Updated', time: '10 mins' },
    { icon: '🔔', title: 'Physician Update', time: '15 mins' },
    { icon: '👥', title: 'Clinic Update', time: '17 mins' },
    { icon: '💬', title: 'New Message', time: '25 mins' },
    { icon: '🔖', title: 'Appointment Confirmed', time: '28 mins' },
  ];

  return (
    <div className="dashboard-container" style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>continuum</h1>
        <p>Welcome, <span style={styles.highlight}>Patient</span></p>
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
          <div style={styles.tile}>Messages</div>
          <div style={styles.tile}>Who Is My Coordinator</div>
          <div style={styles.tile}>My Clinic</div>
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
  },
  header: {
    backgroundColor: '#1a202c', // Darker background for branding
    color: '#fff',
    padding: '1rem',
    textAlign: 'center',
  },
  highlight: {
    color: '#3182ce', // Blue accent for branding
    fontWeight: 'bold',
  },
  sidebar: {
    backgroundColor: '#f5f5f5',
    width: '15%',
    padding: '1rem',
    float: 'left',
  },
  navItem: {
    margin: '0.5rem 0',
  },
  main: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#edf2f7',
  },
  tilesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  tile: {
    backgroundColor: '#3182ce', // Continuum's branding blue
    color: '#fff',
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
  },
  feedIcon: {
    marginRight: '0.5rem',
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
    backgroundColor: '#2d3748', // Darker footer
    color: '#fff',
    padding: '1rem',
  },
};

export default Patient;
