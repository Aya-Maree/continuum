import React, { useState } from 'react';
import logo from '../continuumlogo.png'; // Replace with the actual path to your uploaded logo file

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
        <img src={logo} alt="Continuum Logo" style={styles.logo} />
        <p style={styles.tagline}>your care. your conversation.</p>
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'helvetica',
    backgroundColor: '#f6f7ec',
    color: '#274d20',
  },
  header: {
    backgroundColor: '#f6f7ec',
    color: '#f6f7ec',
    padding: '1px',
    textAlign: 'center',
  },
  logo: {
    maxWidth: '500px',
    height: 'auto',
  
  },
  tagline: {
    fontSize: '2rem',
    marginTop: '-10rem',
    color: '#274d20',
    fontFamily: 'lucinda'
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#274d20',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontFamily: 'helvetica'
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
    padding: '0.75rem',
    backgroundColor: '#274d20',
    color: '#f6f7ec',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  error: {
    color: "#e53e3e",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  footer: {
    backgroundColor: '#274d20',
    color: '#f6f7ec',
    textAlign: 'center',
    padding: '1rem',
  },
};

export default Login;
