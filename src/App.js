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
import EmployeeRegister from "./components/EmployeeRegister/EmployeeRegister";
import Loading from "./components/common/Loading/Loading";
import Bill from "./components/bill/Bill";
import PurchaseBill from "./components/bill/PurchaseBill/PurchaseBill";
import DisplayBill from "./components/bill/DisplayBill/DisplayBill";
import BillList from "./components/bill/BillList/BillList";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      const user = JSON.parse(sessionStorage.getItem("userDetails"));
      if (loggedIn && user) {
        setIsLoggedIn(true);
        setUserDetails(user);
      }
      setIsLoading(false);
    };
    fetchData();
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
    if (roles && roles.indexOf(user?.role) === -1 && user?.role !== "admin")
      return <NoAccess />;

    return React.cloneElement(element, { userRole: user?.role, user });
  };

  if (isLoading) {
    return <Loading />;
  }

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
          element={
            <ProtectedRoute element={<Godown />} roles={["manager", "admin"]} />
          }
        />
        <Route
          path="/godown-list"
          element={
            <ProtectedRoute
              element={<GodownList />}
              roles={["manager", "backoffice", "admin"]}
            />
          }
        />
        <Route
          path="/employee-register"
          element={
            <ProtectedRoute
              element={<EmployeeRegister />}
              roles={["admin"]}
            />
          }
        />
        <Route
          path="/bill"
          element={
            <ProtectedRoute
              element={<Bill />}
              roles={["manager", "admin", "fieldstaff"]}
            />
          }
        />
        <Route
          path="/purchase-bill"
          element={
            <ProtectedRoute
              element={<PurchaseBill />}
              roles={["manager", "admin", "fieldstaff"]}
            />
          }
        />
        <Route
          path="/display-bill"
          element={
            <ProtectedRoute
              element={<DisplayBill />}
              roles={["manager", "admin", "fieldstaff"]}
            />
          }
        />
        <Route
          path="/bill-list"
          element={
            <ProtectedRoute
              element={<BillList />}
              roles={["manager", "admin", "fieldstaff"]}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
