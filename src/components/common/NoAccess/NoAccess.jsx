import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Image/Logo/logo.png";

const NoAccess = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={Logo} alt="Logo" className="mb-4" />
      <p className="mb-4 text-lg text-center text-gray-700 italic">
        You are not authorized to access the Godown
      </p>
      <p className="mb-4 text-lg text-center text-gray-700 italic">
        Please Go Back
      </p>
      <button
        onClick={handleBack}
        className="px-14 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default NoAccess;
