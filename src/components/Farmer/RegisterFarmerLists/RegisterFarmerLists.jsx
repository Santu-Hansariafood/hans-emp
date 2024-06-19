import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FarmerTable from "./FarmerTable/FarmerTable";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "./Pagination/Pagination";
import LoadingIndicator from "./LoadingIndicator/LoadingIndicator";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

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
          "http://localhost:3000/api/farmers"
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
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
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
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
      <FarmerTable
        farmers={currentFarmers}
        handleViewDetails={handleViewDetails}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
      <button
        onClick={handleBack}
        className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default RegisterFarmerLists;
