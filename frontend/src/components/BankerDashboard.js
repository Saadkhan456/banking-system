import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component

const BankerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  // Fetch all users, deposits, and withdrawals from the backend
  useEffect(() => {
    // Fetch all users with their balances
    axios
      .get("http://localhost:5000/api/auth/users")
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });

    // Fetch all deposits
    axios
      .get("http://localhost:5000/api/auth/deposits")
      .then((res) => {
        if (res.data.success) {
          setDeposits(res.data.deposits);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch deposits:", err);
      });

    // Fetch all withdrawals
    axios
      .get("http://localhost:5000/api/auth/withdrawals")
      .then((res) => {
        if (res.data.success) {
          setWithdrawals(res.data.withdrawals);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch withdrawals:", err);
      });
  }, []);

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
          marginLeft: "250px", // Adjust based on sidebar width
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          Welcome to Banker Dashboard
        </h1>

        {/* Users Balance Table */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#555", marginBottom: "15px" }}>Users Balance</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Username</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f1f1f1")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <td style={{ padding: "10px" }}>{user.username}</td>
                  <td style={{ padding: "10px" }}>₹{user.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Deposits Table */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#555", marginBottom: "15px" }}>Deposits</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Username</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr
                  key={deposit.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f1f1f1")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <td style={{ padding: "10px" }}>{deposit.username}</td>
                  <td style={{ padding: "10px" }}>₹{deposit.amount}</td>
                  <td style={{ padding: "10px" }}>
                    {new Date(deposit.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Withdrawals Table */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#555", marginBottom: "15px" }}>Withdrawals</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Username</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr
                  key={withdrawal.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f1f1f1")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <td style={{ padding: "10px" }}>{withdrawal.username}</td>
                  <td style={{ padding: "10px" }}>₹{withdrawal.amount}</td>
                  <td style={{ padding: "10px" }}>
                    {new Date(withdrawal.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BankerDashboard;
