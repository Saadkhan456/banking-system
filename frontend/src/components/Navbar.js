import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      style={{
        backgroundColor: "#2c3e50",
        padding: "1rem 2rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      {/* Hamburger Menu Icon (Mobile Only) */}
      <div
        style={{
          display: "none", // Hidden by default
          fontSize: "1.5rem",
          color: "#ecf0f1",
          cursor: "pointer",
        }}
        className="hamburger-menu"
        onClick={toggleSidebar}
      >
        ☰
      </div>

      {/* Navbar Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        className={`navbar-container ${isSidebarOpen ? "open" : ""}`}
      >
        <NavLink
          to="/about"
          style={{
            color: "#ecf0f1",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "500",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            transition: "all 0.3s ease",
          }}
          activeStyle={{
            backgroundColor: "#3498db",
            color: "#ffffff",
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/employees"
          style={{
            color: "#ecf0f1",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "500",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            transition: "all 0.3s ease",
          }}
          activeStyle={{
            backgroundColor: "#3498db",
            color: "#ffffff",
          }}
        >
          Employees
        </NavLink>
        <NavLink
          to="/user"
          style={{
            color: "#ecf0f1",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "500",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            transition: "all 0.3s ease",
          }}
          activeStyle={{
            backgroundColor: "#3498db",
            color: "#ffffff",
          }}
        >
          User
        </NavLink>
        <NavLink
          to="/banker"
          style={{
            color: "#ecf0f1",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "500",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            transition: "all 0.3s ease",
          }}
          activeStyle={{
            backgroundColor: "#3498db",
            color: "#ffffff",
          }}
        >
          Banker
        </NavLink>
      </div>

      {/* Overlay for Mobile (when sidebar is open) */}
      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
