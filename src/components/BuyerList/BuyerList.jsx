import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BuyerTable from "./BuyerTable/BuyerTable";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "./Pagination/Pagination";
import GenerateExcelButton from "./ExportToExcel/ExportToExcel";

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await axios.get(
        "https://main-server-2kc5.onrender.com/api/buyers"
      );
      setBuyers(response.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const handleView = (buyer) => {
    navigate(`/buyer/${buyer._id}`);
  };

  const handleEdit = (buyer) => {
    navigate(`/edit-buyer/${buyer._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://main-server-2kc5.onrender.com/api/buyers/${id}`
      );
      setBuyers(buyers.filter((buyer) => buyer._id !== id));
    } catch (error) {
      console.error("Error deleting buyer:", error);
    }
  };

  const handleAddBuyer = () => {
    navigate("/new-buyer");
  };

  const filteredBuyers = buyers.filter((buyer) =>
    buyer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBuyers = filteredBuyers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <GenerateExcelButton buyers={filteredBuyers} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddBuyer}
        >
          Add Buyer
        </button>
      </div>
      <BuyerTable
        buyers={paginatedBuyers}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredBuyers.length}
        pageSize={pageSize}
        handlePreviousPage={() => setCurrentPage(currentPage - 1)}
        handleNextPage={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};

export default BuyerList;
