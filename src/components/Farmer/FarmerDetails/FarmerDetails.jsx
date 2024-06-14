import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import FarmerInfo from "./FarmerInfo/FarmerInfo";
import LoadingIndicator from "./LoadingIndicator/LoadingIndicator";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import QRCodeDisplay from "./QRCodeDisplay/QRCodeDisplay";

const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const response = await axios.get(
          `https://main-server-9oo9.onrender.com/registerFarmer`
        );
        const farmerData = response.data.farmers.find((f) => f._id === id);
        if (farmerData) {
          setFarmer(farmerData);
        } else {
          setError("Farmer not found");
        }
      } catch (error) {
        console.error("Error fetching farmer details:", error);
        setError("Failed to fetch farmer details");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerDetails();
  }, [id]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const generateQRValue = (farmer) => {
    return JSON.stringify(farmer, null, 2);
  };
const title = "Register Farmer Details"
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          {title}
        </h2>
        {farmer && <FarmerInfo farmer={farmer} />}
        {farmer && <QRCodeDisplay value={generateQRValue(farmer)} />}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetails;
