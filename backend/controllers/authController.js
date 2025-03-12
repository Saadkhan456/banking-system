const db = require("../config/db");

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

const register = (req, res) => {
  const { username, password } = req.body;

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

const withdraw = (req, res) => {
  const { username, card_number, pin, phone_number, amount } = req.body;

  if (card_number !== "1234 5678 1234 5678" || pin !== "1098") {
    return res.json({ success: false, message: "Invalid card number or PIN" });
  }

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

      const currentBalance = parseFloat(results[0].balance);
      const withdrawAmount = parseFloat(amount);

      if (isNaN(withdrawAmount)) {
        return res.json({ success: false, message: "Invalid amount" });
      }

      if (currentBalance < withdrawAmount) {
        return res.json({ success: false, message: "Insufficient balance" });
      }

      const newBalance = currentBalance - withdrawAmount;
      console.log("New balance after withdrawal:", newBalance);

      db.query(
        "UPDATE users SET balance = ? WHERE username = ?",
        [newBalance, username],
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({ success: false, message: "Database error" });
          }

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

const deposit = (req, res) => {
  const { username, card_number, pin, phone_number, amount } = req.body;

  if (card_number !== "1234 5678 1234 5678" || pin !== "1098") {
    return res.json({ success: false, message: "Invalid card number or PIN" });
  }

  console.log("Deposit request received for user:", username);

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

      const currentBalance = parseFloat(results[0].balance);
      const depositAmount = parseFloat(amount);

      if (isNaN(depositAmount)) {
        return res.json({ success: false, message: "Invalid amount" });
      }

      const newBalance = currentBalance + depositAmount;
      console.log("New balance after deposit:", newBalance);

      db.query(
        "UPDATE users SET balance = ? WHERE username = ?",
        [newBalance, username],
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.json({ success: false, message: "Database error" });
          }

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

const getAllUsers = (req, res) => {
  db.query("SELECT username, balance FROM users", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Database error" });
    }
    res.json({ success: true, users: results });
  });
};

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
