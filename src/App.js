import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header/Header";
import LoginForm from "./components/Login/Login";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import WorkDetails from "./components/WorkDetails/WorkDetails";
import RegisterFarmer from "./components/Farmer/RegisterFarmer/RegisterFarmer";
import RegisterFarmerLists from "./components/Farmer/RegisterFarmerLists/RegisterFarmerLists";
import FarmerDetails from "./components/Farmer/FarmerDetails/FarmerDetails";
import Godown from "./components/Godown/Godown";
import GodownList from "./components/Godown/GodownList/GodownList";
import NotFound from "./components/common/Header/NotFound/NotFound";
import NoAccess from "./components/common/NoAccess/NoAccess";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(sessionStorage.getItem("userDetails"));
    if (loggedIn && user) {
      setIsLoggedIn(true);
      setUserDetails(user);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserDetails(user);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userDetails", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserDetails(null);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userDetails");
  };

  const ProtectedRoute = ({ element, roles }) => {
    const loggedIn =
      isLoggedIn || sessionStorage.getItem("isLoggedIn") === "true";
    const user =
      userDetails || JSON.parse(sessionStorage.getItem("userDetails"));

    if (!loggedIn) return <Navigate to="/" replace />;
    if (roles && roles.indexOf(user?.role) === -1) return <NoAccess />;

    return React.cloneElement(element, { userRole: user?.role, user });
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
        <Route
          path="/godown"
          element={<ProtectedRoute element={<Godown />} roles={["manager"]} />}
        />
        <Route
          path="/godown-list"
          element={
            <ProtectedRoute
              element={<GodownList />}
              roles={["manager", "backoffice"]}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
