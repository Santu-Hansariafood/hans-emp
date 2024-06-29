import React from "react";
import EmployeeRegisterForm from "./EmployeeRegisterForm/EmployeeRegisterForm";

const EmployeeRegister = () => {
  const title = "Register New Employee";
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
        {title}
      </h2>
      <EmployeeRegisterForm />
    </div>
  );
};

export default EmployeeRegister;
