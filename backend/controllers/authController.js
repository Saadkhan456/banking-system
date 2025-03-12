const db = require("../config/db");

// Login function
const login = (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
      if (results.length > 0 && results[0].password === password) {
        res.json({
          success: true,
          role: results[0].role,
          username: results[0].username,
          balance: results[0].balance,
        });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
};

// Register function
const register = (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }

      if (results.length > 0) {
        return res.json({ success: false, message: "Username already exists" });
      }

      // Insert new user into the database with a default balance of 1000
      db.query(
        "INSERT INTO users (username, password, role, balance) VALUES (?, ?, ?, ?)",
        [username, password, "user", 1000.0],
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({ success: false, message: "Database error" });
          }
          res.json({ success: true, message: "User registered successfully" });
        }
      );
    }
  );
};

// Withdraw function
const withdraw = (req, res) => {
  const { username, card_number, pin, phone_number, amount } = req.body;

  // Validate card number and pin
  if (card_number !== "1234 5678 1234 5678" || pin !== "1098") {
    return res.json({ success: false, message: "Invalid card number or PIN" });
  }

  // Check if the user exists and has sufficient balance
  db.query(
    "SELECT balance FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }

      if (results.length === 0) {
        return res.json({ success: false, message: "User not found" });
      }

      const currentBalance = parseFloat(results[0].balance); // Ensure balance is a number
      const withdrawAmount = parseFloat(amount); // Ensure amount is a number

      if (isNaN(withdrawAmount)) {
        return res.json({ success: false, message: "Invalid amount" });
      }

      if (currentBalance < withdrawAmount) {
        return res.json({ success: false, message: "Insufficient balance" });
      }

      const newBalance = currentBalance - withdrawAmount; // Perform numeric subtraction
      console.log("New balance after withdrawal:", newBalance); // Debug log

      // Update the user's balance
      db.query(
        "UPDATE users SET balance = ? WHERE username = ?",
        [newBalance, username],
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({ success: false, message: "Database error" });
          }

          // Insert withdrawal record into the database
          db.query(
            "INSERT INTO user_withdraw (username, card_number, pin, phone_number, amount) VALUES (?, ?, ?, ?, ?)",
            [username, card_number, pin, phone_number, withdrawAmount],
            (err, results) => {
              if (err) {
                console.error("Database error:", err);
                return res.json({ success: false, message: "Database error" });
              }
              res.json({
                success: true,
                message: "Withdrawal successful",
                balance: newBalance,
              });
            }
          );
        }
      );
    }
  );
};

// Deposit function
const deposit = (req, res) => {
  const { username, card_number, pin, phone_number, amount } = req.body;

  // Validate card number and pin
  if (card_number !== "1234 5678 1234 5678" || pin !== "1098") {
    return res.json({ success: false, message: "Invalid card number or PIN" });
  }

  console.log("Deposit request received for user:", username); // Debug log

  // Check if the user exists
  db.query(
    "SELECT balance FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }

      if (results.length === 0) {
        return res.json({ success: false, message: "User not found" });
      }

      const currentBalance = parseFloat(results[0].balance); // Ensure balance is a number
      const depositAmount = parseFloat(amount); // Ensure amount is a number

      if (isNaN(depositAmount)) {
        return res.json({ success: false, message: "Invalid amount" });
      }

      const newBalance = currentBalance + depositAmount; // Perform numeric addition
      console.log("New balance after deposit:", newBalance); // Debug log

      // Update the user's balance
      db.query(
        "UPDATE users SET balance = ? WHERE username = ?",
        [newBalance, username],
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({ success: false, message: "Database error" });
          }

          // Insert deposit record into the database
          db.query(
            "INSERT INTO user_deposit (username, card_number, pin, phone_number, amount) VALUES (?, ?, ?, ?, ?)",
            [username, card_number, pin, phone_number, depositAmount],
            (err, results) => {
              if (err) {
                console.error("Database error:", err);
                return res.json({ success: false, message: "Database error" });
              }
              res.json({
                success: true,
                message: "Deposit successful",
                balance: newBalance,
              });
            }
          );
        }
      );
    }
  );
};

// Get user balance
const getBalance = (req, res) => {
  const { username } = req.params;

  db.query(
    "SELECT balance FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
      if (results.length > 0) {
        res.json({ success: true, balance: results[0].balance });
      } else {
        res.json({ success: false, message: "User not found" });
      }
    }
  );
};

// Get all users with their balances
const getAllUsers = (req, res) => {
  db.query("SELECT username, balance FROM users", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Database error" });
    }
    res.json({ success: true, users: results });
  });
};

// Get all deposits
const getAllDeposits = (req, res) => {
  db.query(
    "SELECT username, amount, timestamp FROM user_deposit",
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
      res.json({ success: true, deposits: results });
    }
  );
};

// Get all withdrawals
const getAllWithdrawals = (req, res) => {
  db.query(
    "SELECT username, amount, timestamp FROM user_withdraw",
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
      res.json({ success: true, withdrawals: results });
    }
  );
};

// Export all functions
module.exports = {
  login,
  register,
  withdraw,
  deposit,
  getBalance,
  getAllUsers,
  getAllDeposits,
  getAllWithdrawals,
};
