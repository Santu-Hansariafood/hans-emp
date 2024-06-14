import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EmployeeInfo from "./EmployeeInfo/EmployeeInfo";
import QRCodeDisplay from "./QRCodeDisplay/QRCodeDisplay";
import NavigationButtons from "./NavigationButtons/NavigationButtons";

const EmployeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  if (!employee) {
    return <p>No employee data found.</p>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    Swal.fire({
      title: "Proceed to Work Details?",
      text: "You will be navigated to the next component.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/work-details", { state: { employee } });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Employee Details
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
        <EmployeeInfo employee={employee} />
        <QRCodeDisplay employee={employee} />
      </div>
      <NavigationButtons handleBack={handleBack} handleNext={handleNext} />
    </div>
  );
};

export default EmployeeDetails;
