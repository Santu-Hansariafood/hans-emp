import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function RiceMillTable() {
  const [riceMills, setRiceMills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRiceMills();
  }, []);

  const fetchRiceMills = async () => {
    try {
      const response = await axios.get("https://main-server-2kc5.onrender.com/api/rice-mills");
      setRiceMills(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch rice mills", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://main-server-2kc5.onrender.com/api/rice-mills/${id}`);
        Swal.fire("Deleted!", "Rice mill has been deleted.", "success");
        fetchRiceMills();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete rice mill", "error");
    }
  };

  const handleView = (id) => {
    navigate(`/rice-mills/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/rice-mills/edit/${id}`);
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleGenerateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(riceMills);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rice Mills");
    XLSX.writeFile(workbook, "RiceMills.xlsx");
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = riceMills.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(riceMills.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold text-center">Rice Mills Lists</h2>
        <button
          onClick={handleGenerateExcel}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Generate Excel
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Rice Mill Name</th>
            <th className="py-2">State</th>
            <th className="py-2">District</th>
            <th className="py-2">Phone Number</th>
            <th className="py-2">Email ID</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((mill) => (
            <tr key={mill._id}>
              <td className="py-2">{mill.name}</td>
              <td className="py-2">{mill.role}</td>
              <td className="py-2">{mill.riceMillName}</td>
              <td className="py-2">{mill.state}</td>
              <td className="py-2">{mill.district}</td>
              <td className="py-2">{mill.phoneNumber}</td>
              <td className="py-2">{mill.email}</td>
              <td className="py-2">
                <button
                  onClick={() => handleView(mill._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mx-1 hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(mill._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mx-1 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(mill._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md mx-1 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              index + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RiceMillTable;
