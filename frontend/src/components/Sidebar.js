import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#2c3e50",
        color: "#fff",
        padding: "20px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "24px", color: "#ecf0f1" }}>
        Dashboard
      </h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "15px" }}>
          <Link
            to="/userMoney/withdraw"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              fontSize: "18px",
              display: "block",
              padding: "10px",
              borderRadius: "4px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#34495e")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Withdraw
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link
            to="/userMoney/deposit"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              fontSize: "18px",
              display: "block",
              padding: "10px",
              borderRadius: "4px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#34495e")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Deposit
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
