import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Map from "./Map/Map";

const Patient = () => {
  const feeds = [
    { icon: '👤', title: 'Medical Record Updated', time: '10 mins' },
    { icon: '🔔', title: 'Physician Update', time: '15 mins' },
    { icon: '👥', title: 'Clinic Update', time: '17 mins' },
    { icon: '💬', title: 'New Message', time: '25 mins' },
    { icon: '🔖', title: 'Appointment Confirmed', time: '28 mins' },
  ];

  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";

    // Define the script's onload behavior
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: "674b77a6da1cb2ab8ae7db8e" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        voice: true, 
          open: false, 
          position: "bottom-left", 
          theme: {
            primaryColor: "#4CAF50", // Green theme
            textColor: "#000000", // Black text
            backgroundColor: "#F4F4F4",
            bubbleColor: "#FFFFFF", 
          },
      });
    };

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="dashboard-container" style={styles.container}>
      
      {/* Header */}
      <header style={styles.header}>
        <h1>continuum</h1>
        <p>
          Welcome, <span style={styles.highlight}>Patient</span>
        </p>
      </header>

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
          {/* Feeds Section */}
          <div style={styles.feeds}>
            <h2>Feeds</h2>
            <ul style={styles.feedList}>
              {feeds.map((feed) => (
                <li key={feed.id} style={styles.feedItem}>
                  <span style={styles.feedIcon}>{feed.icon}</span>
                  <Link to={`/feeds/${feed.id}`} style={styles.feedLink}>
                    {feed.title}
                  </Link>
                  <span style={styles.feedTime}>{feed.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={styles.region}>
            <h2 style={styles.regionHeading}>Regions</h2>
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
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    backgroundColor: "#f4f7f5", // Light sage
  },
  header: {
    backgroundColor: "#2f4f4f", // Dark evergreen
    color: "#f4f7f5", // Light sage
    padding: "1rem",
    textAlign: "center",
  },
  highlight: {
    color: "#9abf88", // Sage green accent
    fontWeight: "bold",
  },
  sidebar: {
    backgroundColor: "#e6edea", // Light sage
    width: "15%",
    padding: "1rem",
    float: "left",
    color: "#2f4f4f", // Evergreen text
  },
  navItem: {
    margin: "0.5rem 0",
  },
  main: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "#f9fbf9", // Very light sage
  },
  tilesContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  tile: {
    backgroundColor: "#6b8f71", // Sage green
    color: "#f4f7f5", // Light sage text
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    flex: 1,
    margin: "0 0.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  feedsRegions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  feeds: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1rem",
    marginRight: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    color: "#2f4f4f", // Evergreen text
  },
  feedList: {
    listStyle: "none",
    padding: 0,
  },
  feedItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
  },
  feedIcon: {
    marginRight: "0.5rem",
    color: "#6b8f71", // Sage green icons
  },
  feedTime: {
    color: "#888",
    fontSize: "0.8rem",
  },
  region: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    color: "#2f4f4f", // Evergreen text
  },
  regionHeading: {
    flex: 1,
    color: "#2f4f4f", // Evergreen text
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#2f4f4f", // Dark evergreen
    color: "#f4f7f5", // Light sage
    padding: "1rem",
  },
};

export default Patient;
