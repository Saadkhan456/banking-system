import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const UserMoney = () => {
  const location = useLocation();
  const { username } = location.state || { username: "Guest" };
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (username !== "Guest") {
      axios
        .get(`http://localhost:5000/api/auth/balance/${username}`)
        .then((res) => {
          if (res.data.success) {
            setBalance(res.data.balance);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch balance:", err);
        });
    }
  }, [username]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: "250px",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "10px" }}>
          Welcome, {username}
        </h1>
        <p style={{ color: "#555", fontSize: "18px", marginBottom: "20px" }}>
          Your current balance: <strong>₹{balance}</strong>
        </p>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Outlet context={{ balance, setBalance }} />{" "}
          {/* Pass balance and setBalance to nested routes */}
        </div>
      </div>
    </div>
  );
};

export default UserMoney;
