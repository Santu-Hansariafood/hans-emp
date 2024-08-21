import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../common/Loading/Loading";

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center" 
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1562564055-71e051d94454")' }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Rice Mill Details</h2>
        {riceMill ? (
          <div>
            <table className="table-auto w-full mb-6">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Name</td>
                  <td className="border px-4 py-2">{riceMill.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Role</td>
                  <td className="border px-4 py-2">{riceMill.role}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Rice Mill Name</td>
                  <td className="border px-4 py-2">{riceMill.riceMillName}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Address</td>
                  <td className="border px-4 py-2">{riceMill.address}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">State</td>
                  <td className="border px-4 py-2">{riceMill.state}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Pin</td>
                  <td className="border px-4 py-2">{riceMill.pin}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">District</td>
                  <td className="border px-4 py-2">{riceMill.district}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Phone Number</td>
                  <td className="border px-4 py-2">{riceMill.phoneNumber}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Email ID</td>
                  <td className="border px-4 py-2">{riceMill.email}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Print
              </button>
            </div>
          </div>
        ) : (
          <Loading/>
        )}
      </div>
    </div>
  );
}

export default ViewRiceMill;
