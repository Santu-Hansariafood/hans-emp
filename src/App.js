import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header/Header";
import LoginForm from "./components/Login/Login";
import Loading from "./components/common/Loading/Loading";

const EmployeeDetails = lazy(() => import("./components/EmployeeDetails/EmployeeDetails"));
const WorkDetails = lazy(() => import("./components/WorkDetails/WorkDetails"));
const RegisterFarmer = lazy(() => import("./components/Farmer/RegisterFarmer/RegisterFarmer"));
const RegisterFarmerLists = lazy(() => import("./components/Farmer/RegisterFarmerLists/RegisterFarmerLists"));
const FarmerDetails = lazy(() => import("./components/Farmer/FarmerDetails/FarmerDetails"));
const Godown = lazy(() => import("./components/Godown/Godown"));
const GodownList = lazy(() => import("./components/Godown/GodownList/GodownList"));
const NoAccess = lazy(() => import("./components/common/NoAccess/NoAccess"));
const EmployeeRegister = lazy(() => import("./components/EmployeeRegister/EmployeeRegister"));
const Bill = lazy(() => import("./components/bill/Bill"));
const PurchaseBill = lazy(() => import("./components/bill/PurchaseBill/PurchaseBill"));
const DisplayBill = lazy(() => import("./components/bill/DisplayBill/DisplayBill"));
const BillList = lazy(() => import("./components/bill/BillList/BillList"));
const DisplayBillByList = lazy(() => import("./components/bill/DisplayBill/DisplayBillByList"));
const EditDisplayBill = lazy(() => import("./components/bill/DisplayBill/EditDisplayBill"));
const NewCompany = lazy(() => import("./components/Company/NewCompany/NewCompany"));
const CompanyList = lazy(() => import("./components/Company/CompanyList/CompanyList"));
const EmployeeList = lazy(() => import("./components/EmployeeList/EmployeeList"));
const NewBuyer = lazy(() => import("./components/NewBuyer/NewBuyer"));
const BuyerList = lazy(() => import("./components/BuyerList/BuyerList"));
const BidForSupplier = lazy(() => import("./components/Bid/BidForSupplier/BidForSupplier"));
const MakeBidForBuyer = lazy(() => import("./components/Bid/MakeBidForBuyer/MakeBidForBuyer"));
const NewConsignee = lazy(() => import("./components/Consignee/NewConsignee/NewConsignee"));
const ConsigneeTable = lazy(() => import("./components/Consignee/ConsigneeTable/ConsigneeTable"));
const NotFound = lazy(() => import("./components/common/Header/NotFound/NotFound"));
const WarehouseManagement = lazy(() => import("./components/WarehouseManagement/WarehouseManagement"));
const SupplierBidMaster = lazy(() => import("./components/SupplierBidMaster/SupplierBidMaster"));
const EditBid = lazy(() => import("./components/EditBid/EditBid"));
const PlaceBid = lazy(() => import("./components/PlaceBid/PlaceBid"));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        const cachedUserDetails = JSON.parse(sessionStorage.getItem("userDetails"));

        if (cachedIsLoggedIn && cachedUserDetails) {
          setIsLoggedIn(cachedIsLoggedIn);
          setUserDetails(cachedUserDetails);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
          const user = JSON.parse(sessionStorage.getItem("userDetails"));

          if (loggedIn && user) {
            setIsLoggedIn(true);
            setUserDetails(user);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userDetails", JSON.stringify(user));
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
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
    const loggedIn = isLoggedIn || sessionStorage.getItem("isLoggedIn") === "true";
    const user = userDetails || JSON.parse(sessionStorage.getItem("userDetails"));

    if (!loggedIn) return <Navigate to="/" replace />;
    if (roles && roles.indexOf(user?.role) === -1 && user?.role !== "admin") return <NoAccess />;

    return React.cloneElement(element, { userRole: user?.role, user });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} userDetails={userDetails} onLogout={handleLogout} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/employee-details" element={<ProtectedRoute element={<EmployeeDetails />} />} />
          <Route path="/work-details" element={<ProtectedRoute element={<WorkDetails />} />} />
          <Route path="/register-farmer" element={<ProtectedRoute element={<RegisterFarmer />} />} />
          <Route path="/register-farmer-lists" element={<ProtectedRoute element={<RegisterFarmerLists />} />} />
          <Route path="/farmer-details/:id" element={<ProtectedRoute element={<FarmerDetails />} />} />
          <Route path="/godown" element={<ProtectedRoute element={<Godown />} roles={["manager", "admin"]} />} />
          <Route path="/godown-list" element={<ProtectedRoute element={<GodownList />} roles={["manager", "backoffice", "admin"]} />} />
          <Route path="/employee-register" element={<ProtectedRoute element={<EmployeeRegister />} roles={["admin"]} />} />
          <Route path="/employee-list" element={<ProtectedRoute element={<EmployeeList />} roles={["manager", "admin"]} />} />
          <Route path="/bill" element={<ProtectedRoute element={<Bill />} roles={["manager", "admin", "fieldstaff"]} />} />
          <Route path="/purchase-bill" element={<ProtectedRoute element={<PurchaseBill />} roles={["manager", "admin", "fieldstaff"]} />} />
          <Route path="/display-bill" element={<ProtectedRoute element={<DisplayBill />} roles={["manager", "admin", "fieldstaff"]} />} />
          <Route path="/display-bill-list/:id" element={<ProtectedRoute element={<DisplayBillByList />} roles={["manager", "admin", "fieldstaff"]} />} />
          <Route path="/edit-bill/:id" element={<ProtectedRoute element={<EditDisplayBill />} roles={["manager", "admin"]} />} />
          <Route path="/bill-list" element={<ProtectedRoute element={<BillList />} roles={["manager", "admin", "fieldstaff"]} />} />
          <Route path="/new-company" element={<ProtectedRoute element={<NewCompany />} roles={["manager", "admin"]} />} />
          <Route path="/company-list" element={<ProtectedRoute element={<CompanyList />} roles={["manager", "admin"]} />} />
          <Route path="/new-buyer" element={<ProtectedRoute element={<NewBuyer />} roles={["manager", "admin"]} />} />
          <Route path="/buyer-list" element={<ProtectedRoute element={<BuyerList />} roles={["manager", "admin"]} />} />
          <Route path="/bid-for-supplier" element={<ProtectedRoute element={<BidForSupplier />} roles={["admin", "manager"]} />} />
          <Route path="/bid-for-buyer" element={<ProtectedRoute element={<MakeBidForBuyer />} roles={["admin", "manager"]} />} />
          <Route path="/add-new-consignee" element={<ProtectedRoute element={<NewConsignee />} roles={["admin", "manager"]} />} />
          <Route path="/consignee-table" element={<ProtectedRoute element={<ConsigneeTable />} roles={["admin", "manager"]} />} />
          <Route path="/ware-house" element={<ProtectedRoute element={<WarehouseManagement />} roles={["fieldstaff", "admin", "manager", "backoffice"]}/>} />
          <Route path="/supplier-bid-master" element={<ProtectedRoute element={<SupplierBidMaster />} roles={["admin", "manager"]}/>} />
          <Route path="/edit-bid/:id" element={<ProtectedRoute element={<EditBid />} roles={["admin", "manager"]}/>} />
          <Route path="/place-bid" element={<ProtectedRoute element={<PlaceBid />} roles={["admin"]}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
