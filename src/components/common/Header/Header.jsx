import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, userDetails, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Farmer Management System</h1>
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <p>Welcome, {userDetails?.firstname}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
