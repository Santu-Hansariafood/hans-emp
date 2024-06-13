import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WorkOptions from "./WorkOptions/WorkOptions";

const WorkDetails = ({ user, userRole }) => {
  const navigate = useNavigate();

  const [options, setOptions] = useState([
    { id: "registerFarmer", label: "Register Farmer", checked: false },
    { id: "listOfFarmers", label: "List of Farmers", checked: false },
    { id: "godownList", label: "Godown List", checked: false },
    { id: "addGodown", label: "Add Godown", checked: false },
    { id: "bill", label: "Purchase Bill", checked: false },
    { id: "billList", label: "Show Bill List", checked: false },
    { id: "registerEmployee", label: "Register Employee", checked: false },
    { id: "employeeList", label: "Employee List", checked: false }, // New option for Employee List
    { id: "addCompany", label: "Add Company", checked: false },
    { id: "companyMaster", label: "Company Master", checked: false },
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
        navigate(nextRoute, { state: { user } });
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
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Work Details
      </h2>
      <WorkOptions options={options} handleChange={handleChange} />
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkDetails;
