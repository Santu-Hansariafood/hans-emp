import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const TravelDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName } = location.state || {};

  const [startReading, setStartReading] = useState("");
  const [endReading, setEndReading] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const travelData = {
        employeeName: fullName,
        startReading,
        endReading,
        date: currentDate,
      };

      await axios.post(
        "http://localhost:3000/api/travel-details/travel-details",
        travelData
      );

      Swal.fire({
        title: "Success",
        text: "Travel details submitted successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      navigate("/your-next-route");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting travel details. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
        Travel Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Employee Name:
          </label>
          <input
            type="text"
            value={fullName}
            readOnly
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Start Reading:
          </label>
          <input
            type="text"
            value={startReading}
            onChange={(e) => setStartReading(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter Start Entry"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            End Reading:
          </label>
          <input
            type="text"
            value={endReading}
            onChange={(e) => setEndReading(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter End Entry"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Current Date:
          </label>
          <input
            type="text"
            value={currentDate}
            readOnly
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelDetails;
