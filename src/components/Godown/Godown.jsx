import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import QualityParameters from "../QualityParameters/QualityParameters";
import statesData from "../../data/state.json";
import NoAccess from "../common/NoAccess/NoAccess";

const Godown = ({ user }) => {
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pin, setPin] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [rate, setRate] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [quality, setQuality] = useState([
    { parameter: "Moisture", accepted: "10%", upto: "12%" },
    { parameter: "Broken", accepted: "12%", upto: "15%" },
    { parameter: "F.M.", accepted: "2%", upto: "3%" },
    { parameter: "Damage", accepted: "12%", upto: "15%" },
    { parameter: "Small Gain", accepted: "2%", upto: "3%" },
  ]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user.role !== "manager" && user.role !== "admin") {
      Swal.fire({
        title: "Access Denied",
        text: "Only managers and admins can add a godown.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/godowns", {
        name,
        location: {
          name: locationName,
          landmark,
          pin,
          state: selectedState,
        },
        rate,
        totalCapacity,
        quality,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Godown added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setName("");
        setLocationName("");
        setLandmark("");
        setPin("");
        setSelectedState("");
        setRate("");
        setTotalCapacity("");
        setQuality([
          { parameter: "Moisture", accepted: "10%", upto: "12%" },
          { parameter: "Broken", accepted: "12%", upto: "15%" },
          { parameter: "F.M.", accepted: "2%", upto: "3%" },
          { parameter: "Damage", accepted: "12%", upto: "15%" },
          { parameter: "Small Gain", accepted: "2%", upto: "3%" },
        ]);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add godown. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Add Godown
      </h2>
      {user.role !== "manager" && user.role !== "admin" && (
        <NoAccess/>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Godown Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled={user.role !== "manager" && user.role !== "admin"}
              placeholder="Enter Godown Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="locationName">
              Location Name
            </label>
            <input
              type="text"
              id="locationName"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled={user.role !== "manager" && user.role !== "admin"}
              placeholder="Enter Location Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="landmark">
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled={user.role !== "manager" && user.role !== "admin"}
              placeholder="Enter Landmark"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="pin">
              Pin
            </label>
            <input
              type="number"
              id="pin"
              minLength={6}
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                user.role !== "manager" && user.role !== "admin"
                  ? "cursor-not-allowed"
                  : ""
              }`}
              required
              disabled={user.role !== "manager" && user.role !== "admin"}
              placeholder="Enter Pin Number"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="state">
            State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            disabled={user.role !== "manager" && user.role !== "admin"}
            placeholder="Select State"
          >
            <option value="">Select State</option>
            {statesData.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="rate">
            Rate
          </label>
          <input
            type="number"
            id="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            disabled={user.role !== "manager" && user.role !== "admin"}
            placeholder="Enter Rate"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="totalCapacity">
            Total Capacity (in quintals)
          </label>
          <input
            type="number"
            id="totalCapacity"
            value={totalCapacity}
            onChange={(e) => setTotalCapacity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            disabled={user.role !== "manager" && user.role !== "admin"}
            placeholder="Enter Total Capacity"
          />
        </div>
        <QualityParameters
          parameters={quality}
          setParameters={setQuality}
          disabled={user.role !== "manager" && user.role !== "admin"}
        />
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            disabled={user.role !== "manager" && user.role !== "admin"}
          >
            Add Godown
          </button>
        </div>
      </form>
    </div>
  );
};

export default Godown;
