import React from 'react';
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link 
        to="/work-details" 
        className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
      >
        <FaHome className="mr-2" /> 
      </Link>
    </div>
  );
}

export default Dashboard;
