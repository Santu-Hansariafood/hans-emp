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
    <div className="max-w-4xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
        Employee Details
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center mt-4 p-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg shadow-md">
        <EmployeeInfo employee={employee} />
        <QRCodeDisplay employee={employee} />
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

export default EmployeeDetails;
