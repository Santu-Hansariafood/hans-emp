import React from "react";
import EmployeeRegisterForm from "./EmployeeRegisterForm/EmployeeRegisterForm";

const EmployeeRegister = () => {
  const title = "Register New Employee";
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        {title}
      </h2>
      <EmployeeRegisterForm />
    </div>
  );
};

export default EmployeeRegister;
