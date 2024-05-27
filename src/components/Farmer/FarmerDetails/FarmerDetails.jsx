import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

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
          `http://localhost:3000/registerFarmer`
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const generateQRValue = (farmer) => {
    return JSON.stringify(farmer, null, 2);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Farmer Details
        </h2>
        {farmer && (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-right font-semibold text-gray-600">
              <p>Name:</p>
              <p>Father's Name:</p>
              <p>Mobile:</p>
              <p>Email:</p>
              <p>State:</p>
              <p>District:</p>
              <p>Police Station:</p>
              <p>Village:</p>
              <p>Pin Code:</p>
              <p>Adher Number:</p>
              <p>PAN Number:</p>
              <p>GST Number:</p>
              <p>Account Number:</p>
              <p>IFSC Number:</p>
              <p>Branch Name:</p>
              <p>Account Holder Name:</p>
              <p>Bank Name:</p>
            </div>
            <div className="text-left text-gray-700">
              <p>{farmer.name}</p>
              <p>{farmer.fatherName}</p>
              <p>{farmer.mobile}</p>
              <p>{farmer.email}</p>
              <p>{farmer.state}</p>
              <p>{farmer.district}</p>
              <p>{farmer.policeStation}</p>
              <p>{farmer.village}</p>
              <p>{farmer.pinCode}</p>
              <p>{farmer.adherNumber}</p>
              <p>{farmer.panNumber}</p>
              <p>{farmer.gstNumber}</p>
              <p>{farmer.accountNumber}</p>
              <p>{farmer.ifscNumber}</p>
              <p>{farmer.branchName}</p>
              <p>{farmer.accountHolderName}</p>
              <p>{farmer.bankName}</p>
            </div>
          </div>
        )}
        {farmer && (
          <div className="mt-8 flex justify-center">
            <QRCode value={generateQRValue(farmer)} size={128} />
          </div>
        )}
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
