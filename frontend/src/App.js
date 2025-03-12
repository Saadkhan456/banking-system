import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserMoney from "./components/UserMoney";
import BankerDashboard from "./components/BankerDashboard";
import WithdrawForm from "./components/WithdrawForm";
import DepositForm from "./components/DepositForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User Routes */}
        <Route path="/user" element={<UserForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Banker Routes */}
        <Route path="/banker" element={<LoginForm />} />
        <Route path="/bankerDashboard" element={<BankerDashboard />} />

        {/* User Money Routes */}
        <Route path="/userMoney" element={<UserMoney />}>
          <Route path="withdraw" element={<WithdrawForm />} />
          <Route path="deposit" element={<DepositForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
