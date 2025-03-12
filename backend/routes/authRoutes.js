const express = require("express");
const {
  login,
  register,
  withdraw,
  deposit,
  getBalance,
  getAllUsers,
  getAllDeposits,
  getAllWithdrawals,
} = require("../controllers/authController");

const router = express.Router();

// Existing routes
router.post("/login", login);
router.post("/register", register);
router.post("/withdraw", withdraw);
router.post("/deposit", deposit);
router.get("/balance/:username", getBalance);

// New routes for banker dashboard
router.get("/users", getAllUsers);
router.get("/deposits", getAllDeposits);
router.get("/withdrawals", getAllWithdrawals);

module.exports = router;
