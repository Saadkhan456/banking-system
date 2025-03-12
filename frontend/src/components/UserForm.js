import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      if (res.data.success) {
        // Pass username and balance as state when navigating to /userMoney
        navigate("/userMoney", {
          state: { username: res.data.username, balance: res.data.balance },
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        <p style={styles.registerText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.registerLink}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserForm;

// Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    color: "#333333",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#3498db",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
  registerText: {
    marginTop: "1rem",
    color: "#666666",
  },
  registerLink: {
    color: "#3498db",
    textDecoration: "none",
    fontWeight: "500",
  },
};
