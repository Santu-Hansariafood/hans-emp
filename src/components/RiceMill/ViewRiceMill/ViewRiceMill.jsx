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
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Rice Mill Details</h2>
        {riceMill ? (
          <div>
            <table className="table-auto w-full mb-4 text-sm">
              <tbody>
                <tr>
                  <td className="border px-3 py-1 font-semibold">Name</td>
                  <td className="border px-3 py-1">{riceMill.name}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">Role</td>
                  <td className="border px-3 py-1">{riceMill.role}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">Rice Mill Name</td>
                  <td className="border px-3 py-1">{riceMill.riceMillName}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">Address</td>
                  <td className="border px-3 py-1">{riceMill.address}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">State</td>
                  <td className="border px-3 py-1">{riceMill.state}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">Pin</td>
                  <td className="border px-3 py-1">{riceMill.pin}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">District</td>
                  <td className="border px-3 py-1">{riceMill.district}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">Phone Numbers</td>
                  <td className="border px-3 py-1">
                    {riceMill.phoneNumbers.length > 0 ? riceMill.phoneNumbers.join(", ") : riceMill.phoneNumber}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-1 font-semibold">Email ID</td>
                  <td className="border px-3 py-1">{riceMill.email}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Print
              </button>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .bg-white, .bg-white * {
              visibility: visible;
            }
            .bg-white {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              box-shadow: none;
              background: white;
              font-size: 10px;
              line-height: 1.2;
            }
            table, th, td {
              font-size: 10px;
              border: 1px solid black;
              padding: 4px;
            }
            .flex {
              display: block;
            }
            .flex button {
              display: none;
            }
            h2 {
              font-size: 18px;
            }
            @page {
              size: A4;
              margin: 10mm;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ViewRiceMill;
