import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const WorkDetails = ({ user, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName } = location.state || {};

  const [options, setOptions] = useState([
    { id: "registerFarmer", label: "Register Farmer", checked: false },
    { id: "listOfFarmers", label: "List of Farmers", checked: false },
    { id: "task-manager", label: "TaskManager", checked: false },
    { id: "task-list", label: "TaskList", checked: false },
    { id: "godownList", label: "Godown List", checked: false },
    { id: "addGodown", label: "Add Godown", checked: false },
    { id: "bill", label: "Purchase Bill", checked: false },
    { id: "billList", label: "Show Bill List", checked: false },
    { id: "registerEmployee", label: "Register Employee", checked: false },
    { id: "employeeList", label: "Employee List", checked: false },
    { id: "addCompany", label: "Add Company", checked: false },
    { id: "companyMaster", label: "Company Master", checked: false },
    { id: "buyerList", label: "Buyer List", checked: false },
    { id: "newBuyer", label: "Add Buyer", checked: false },
    { id: "bidForSupplier", label: "Supplier Bid", checked: false },
    { id: "bidForBuyer", label: "Buyer Bid", checked: false },
    { id: "bidForBuyerMaster", label: "Buyer Bid Master", checked: false },
    { id: "addNewConsignee", label: "New Consignee", checked: false },
    { id: "consigneeTable", label: "Consignee List", checked: false },
    { id: "supplier-bid-master", label: "Supplier Bid Master", checked: false },
    { id: "add-products", label: "Add Products", checked: false },
    { id: "product-master", label: "Product Master", checked: false },
    { id: "add-self-company", label: "Add Self Company", checked: false },
    { id: "self-company-master", label: "Self Company Master", checked: false },
    { id: "farmer-data-input", label: "Farmer Data Input", checked: false },
    { id: "farmer-data-input-list", label: "Farmer Data List", checked: false },
    { id: "rice-mill-register", label: "Ricemill Register", checked: false },
    { id: "rice-mill-list", label: "Rice Mill List", checked: false },
    { id: "travels-entry", label: "Travel Entry", checked: false },
    { id: "travels-list", label: "Travel List", checked: false },
    { id: "performance", label: "Travel Report", checked: false },
    {
      id: "rice-mill-performance",
      label: "rice mill performance",
      checked: false,
    },
    {
      id: "farmer-visit-performance",
      label: "Farmer Visit Performance",
      checked: false,
    },
    {
      id: "employee-travel-map",
      label: "Employee Travel Map",
      checked: false,
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    const selectedOption = options.find((option) => option.checked);
    if (!selectedOption) {
      Swal.fire({
        title: "No Selection",
        text: "Please select an option before proceeding.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    let nextRoute = "";
    switch (selectedOption.id) {
      case "registerFarmer":
        nextRoute = "/register-farmer";
        break;
      case "listOfFarmers":
        nextRoute = "/register-farmer-lists";
        break;
      case "task-manager":
        nextRoute = "/task-manager";
        break;
      case "task-list":
        nextRoute = "/task-list";
        break;
      case "godownList":
        nextRoute = "/godown-list";
        break;
      case "addGodown":
        nextRoute = "/godown";
        break;
      case "bill":
        nextRoute = "/bill";
        break;
      case "registerEmployee":
        if (userRole !== "admin") {
          Swal.fire({
            title: "Access Denied",
            text: "Only admin can register employees.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
          return;
        }
        nextRoute = "/employee-register";
        break;
      case "billList":
        nextRoute = "/bill-list";
        break;
      case "employeeList":
        if (userRole !== "admin" && userRole !== "manager") {
          Swal.fire({
            title: "Access Denied",
            text: "Only admin and manager can view the employee list.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
          return;
        }
        nextRoute = "/employee-list";
        break;
      case "addCompany":
        nextRoute = "/new-company";
        break;
      case "companyMaster":
        nextRoute = "/company-list";
        break;
      case "buyerList":
        nextRoute = "/buyer-list";
        break;
      case "newBuyer":
        nextRoute = "/new-buyer";
        break;
      case "bidForSupplier":
        nextRoute = "/bid-for-supplier";
        break;
      case "bidForBuyer":
        nextRoute = "/bid-for-buyer";
        break;
      case "bidForBuyerMaster":
        nextRoute = "/bid-for-buyer-master";
        break;
      case "addNewConsignee":
        nextRoute = "/add-new-consignee";
        break;
      case "consigneeTable":
        nextRoute = "/consignee-table";
        break;
      case "supplier-bid-master":
        nextRoute = "/supplier-bid-master";
        break;
      case "add-products":
        nextRoute = "/add-products";
        break;
      case "product-master":
        nextRoute = "/product-master";
        break;
      case "add-self-company":
        nextRoute = "/add-self-company";
        break;
      case "self-company-master":
        nextRoute = "/self-company-master";
        break;
      case "farmer-data-input":
        nextRoute = "/farmer-data-input";
        break;
      case "farmer-data-input-list":
        nextRoute = "/farmer-data-input-list";
        break;
      case "rice-mill-register":
        nextRoute = "/rice-mill-register";
        break;
      case "rice-mill-list":
        nextRoute = "/rice-mill-list";
        break;
      case "travels-entry":
        nextRoute = "/travels-entry";
        break;
      case "travels-list":
        nextRoute = "/travels-list";
        break;
      case "performance":
        nextRoute = "/performance";
        break;
      case "rice-mill-performance":
        nextRoute = "/rice-mill-performance";
        break;
      case "farmer-visit-performance":
        nextRoute = "/farmer-visit-performance";
        break;
      case "employee-travel-map":
        nextRoute = "/employee-travel-map";
        break;
      default:
        return;
    }

    Swal.fire({
      title: `Proceed to ${selectedOption.label}?`,
      text: "You will be navigated to the next component.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(nextRoute, { state: { user, fullName } });
      }
    });
  };

  const handleChange = (id) => {
    setOptions(
      options.map((option) =>
        option.id === id
          ? { ...option, checked: true }
          : { ...option, checked: false }
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
        Work Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-lg ${
              option.checked
                ? "bg-green-300 border-green-600"
                : "bg-yellow-200 border-yellow-600"
            } cursor-pointer transform transition-transform duration-200 hover:scale-105`}
            onClick={() => handleChange(option.id)}
          >
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => handleChange(option.id)}
                className="mr-2"
              />
              <span className="text-gray-800 font-medium">{option.label}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkDetails;
