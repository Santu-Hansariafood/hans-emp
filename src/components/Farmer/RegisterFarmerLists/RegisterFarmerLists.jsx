import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterFarmerLists = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  const [farmers, setFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get(
          "https://main-server-9oo9.onrender.com/registerFarmer"
        );
        setFarmers(response.data.farmers);
        setTotalPages(Math.ceil(response.data.farmers.length / itemsPerPage));
      } catch (error) {
        setError("Failed to fetch farmer data");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = () => {
    const filteredFarmers = farmers.filter((farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFarmers(filteredFarmers);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewDetails = (id) => {
    navigate(`/farmer-details/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFarmers = farmers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Register Farmer Details
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5">
        <p className="mb-4">
          <strong>Employee Name:</strong> {employee?.firstname}{" "}
          {employee?.lastname}
        </p>
        <div className="flex items-center mt-4 sm:mt-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300"
          >
            <IoIosSearch className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Father's Name</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">State</th>
              <th className="py-2 px-4 border-b">District</th>
              <th className="py-2 px-4 border-b">Police Station</th>
              <th className="py-2 px-4 border-b">Village</th>
              <th className="py-2 px-4 border-b">Pin Code</th>
              <th className="py-2 px-4 border-b">Adher Number</th>
              <th className="py-2 px-4 border-b">PAN Number</th>
              <th className="py-2 px-4 border-b">GST Number</th>
              <th className="py-2 px-4 border-b">Account Number</th>
              <th className="py-2 px-4 border-b">IFSC Number</th>
              <th className="py-2 px-4 border-b">Branch Name</th>
              <th className="py-2 px-4 border-b">Account Holder Name</th>
              <th className="py-2 px-4 border-b">Bank Name</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentFarmers.length > 0 ? (
              currentFarmers.map((farmer) => (
                <tr key={farmer._id}>
                  <td className="py-2 px-4 border-b">{farmer.name}</td>
                  <td className="py-2 px-4 border-b">{farmer.fatherName}</td>
                  <td className="py-2 px-4 border-b">{farmer.mobile}</td>
                  <td className="py-2 px-4 border-b">{farmer.email}</td>
                  <td className="py-2 px-4 border-b">{farmer.state}</td>
                  <td className="py-2 px-4 border-b">{farmer.district}</td>
                  <td className="py-2 px-4 border-b">{farmer.policeStation}</td>
                  <td className="py-2 px-4 border-b">{farmer.village}</td>
                  <td className="py-2 px-4 border-b">{farmer.pinCode}</td>
                  <td className="py-2 px-4 border-b">{farmer.adherNumber}</td>
                  <td className="py-2 px-4 border-b">{farmer.panNumber}</td>
                  <td className="py-2 px-4 border-b">{farmer.gstNumber}</td>
                  <td className="py-2 px-4 border-b">{farmer.accountNumber}</td>
                  <td className="py-2 px-4 border-b">{farmer.ifscNumber}</td>
                  <td className="py-2 px-4 border-b">{farmer.branchName}</td>
                  <td className="py-2 px-4 border-b">
                    {farmer.accountHolderName}
                  </td>
                  <td className="py-2 px-4 border-b">{farmer.bankName}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleViewDetails(farmer._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg transition duration-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="17" className="py-2 px-4 text-center border-b">
                  No farmers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back
        </button>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterFarmerLists;
