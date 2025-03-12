import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const DepositForm = () => {
  const { balance, setBalance } = useOutletContext(); // Get balance and setBalance from context
  const [username, setUsername] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const depositAmount = parseFloat(amount); // Convert amount to a number
      if (isNaN(depositAmount)) {
        setMessage("Invalid amount. Please enter a valid number.");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/auth/deposit", {
        username,
        card_number: cardNumber,
        pin,
        phone_number: phoneNumber,
        amount: depositAmount, // Send as a number
      });
      if (res.data.success) {
        setMessage(res.data.message);
        setBalance(res.data.balance); // Update the balance
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Deposit failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleDeposit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "10px" }}>
        Deposit Money
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label style={{ fontWeight: "bold", color: "#555" }}>Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        required
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        required
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Deposit
      </button>
      {message && (
        <p
          style={{
            color: message.includes("success") ? "green" : "red",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default DepositForm;
