import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Both fields are required.");
      return;
    }

    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Display success message
        setError("");
        // Redirect based on role or endpoint
        if (data.redirectTo === "/patient") {
          window.location.href = "/patient"; // Replace with React Router navigation if using it
        } else if (data.redirectTo === "/physician") {
          window.location.href = "/physician"; // Replace with React Router navigation if using it
        }
      } else {
        setError(data.error || "Invalid login credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>continuum</h1>
        <p>Your seamless healthcare dashboard</p>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login</h2>
          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.message}>{message}</p>}
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Continuum. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#edf2f7",
    color: "#1a202c",
  },
  header: {
    backgroundColor: "#1a202c",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "2rem",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#3182ce",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#3182ce",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#225ea8",
  },
  error: {
    color: "#e53e3e",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  footer: {
    backgroundColor: "#2d3748",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
  },
};

export default Login;
