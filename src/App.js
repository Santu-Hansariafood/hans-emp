import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header/Header";
import LoginForm from "./components/Login/Login";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import WorkDetails from "./components/WorkDetails/WorkDetails";
import RegisterFarmer from "./components/Farmer/RegisterFarmer/RegisterFarmer";
import RegisterFarmerLists from "./components/Farmer/RegisterFarmerLists/RegisterFarmerLists";
import FarmerDetails from "./components/Farmer/FarmerDetails/FarmerDetails";
import NotFound from "./components/common/Header/NotFound/NotFound";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserDetails(user);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserDetails(null);
    sessionStorage.removeItem("isLoggedIn");
  };

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn || sessionStorage.getItem("isLoggedIn") === "true" ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        userDetails={userDetails}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/employee-details"
          element={<ProtectedRoute element={<EmployeeDetails />} />}
        />
        <Route
          path="/work-details"
          element={<ProtectedRoute element={<WorkDetails />} />}
        />
        <Route
          path="/register-farmer"
          element={<ProtectedRoute element={<RegisterFarmer />} />}
        />
        <Route
          path="/register-farmer-lists"
          element={<ProtectedRoute element={<RegisterFarmerLists />} />}
        />
        <Route
          path="/farmer-details/:id"
          element={<ProtectedRoute element={<FarmerDetails />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
