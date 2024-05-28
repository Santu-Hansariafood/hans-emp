import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import Swal from "sweetalert2";

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
        <div className="mb-4 lg:mb-0">
          <p>
            <strong>Employee ID:</strong> {employee._id}
          </p>
          <p>
            <strong>Employee Name:</strong> {employee.firstname}{" "}
            {employee.lastname}
          </p>
          <p>
            <strong>Employee Mobile:</strong> {employee.mobile}
          </p>
          <p>
            <strong>Employee Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Blood Group:</strong> ++
          </p>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-4">
          <QRCode value={JSON.stringify(employee)} />
        </div>
      </div>
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

export default EmployeeDetails;
