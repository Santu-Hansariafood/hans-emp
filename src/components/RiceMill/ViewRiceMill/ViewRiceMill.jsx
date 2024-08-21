import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function ViewRiceMill() {
  const [riceMill, setRiceMill] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRiceMillDetails();
  }, []);

  const fetchRiceMillDetails = async () => {
    try {
      const response = await axios.get(`https://main-server-2kc5.onrender.com/api/rice-mills/${id}`);
      setRiceMill(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch rice mill details", "error");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Rice Mill Details</h2>
      {riceMill ? (
        <div className="bg-white shadow-md rounded p-6">
          <p><strong>Name:</strong> {riceMill.name}</p>
          <p><strong>Role:</strong> {riceMill.role}</p>
          <p><strong>Rice Mill Name:</strong> {riceMill.riceMillName}</p>
          <p><strong>Address:</strong> {riceMill.address}</p>
          <p><strong>State:</strong> {riceMill.state}</p>
          <p><strong>Pin:</strong> {riceMill.pin}</p>
          <p><strong>District:</strong> {riceMill.district}</p>
          <p><strong>Phone Number:</strong> {riceMill.phoneNumber}</p>
          <p><strong>Email ID:</strong> {riceMill.email}</p>
          <button
            onClick={handleBack}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewRiceMill;
