import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";

function RiceMillTable() {
  const [riceMills, setRiceMills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRiceMills();
  }, []);

  const fetchRiceMills = async () => {
    try {
      const response = await axios.get(
        "https://main-server-2kc5.onrender.com/api/rice-mills"
      );
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
        await axios.delete(
          `https://main-server-2kc5.onrender.com/api/rice-mills/${id}`
        );
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
    navigate(-1);
  };

  const handleGenerateExcel = () => {
    const millsForExcel = riceMills.map((mill, index) => ({
      ID: index + 1,
      Name: mill.name,
      Role: mill.role,
      "Rice Mill Name": mill.riceMillName,
      State: mill.state,
      District: mill.district,
      "Phone Numbers": mill.phoneNumber
        ? mill.phoneNumber
        : mill.phoneNumbers.join(", "),
      "Email ID": mill.email,
      "Register By": mill.registerBy?.fullName,
    }));
    const worksheet = XLSX.utils.json_to_sheet(millsForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rice Mills");
    XLSX.writeFile(workbook, "RiceMills.xlsx");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredRiceMills = riceMills.filter((mill) =>
    mill.riceMillName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredRiceMills.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRiceMills.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
          <h2 className="text-2xl font-bold text-center">Rice Mills List</h2>
          <button
            onClick={handleGenerateExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Generate Excel
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Rice Mill Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-4 border border-gray-300">ID</th>
                <th className="py-3 px-4 border border-gray-300">Name</th>
                <th className="py-3 px-4 border border-gray-300">Role</th>
                <th className="py-3 px-4 border border-gray-300">
                  Rice Mill Name
                </th>
                <th className="py-3 px-4 border border-gray-300">State</th>
                <th className="py-3 px-4 border border-gray-300">District</th>
                <th className="py-3 px-4 border border-gray-300">
                  Phone Numbers
                </th>
                <th className="py-3 px-4 border border-gray-300">Email ID</th>
                <th className="py-3 px-4 border border-gray-300">Register By</th>
                <th className="py-3 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((mill, index) => (
                <tr key={mill._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border border-gray-300">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.name}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.role}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.riceMillName}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.state}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.district}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.phoneNumber
                      ? mill.phoneNumber
                      : mill.phoneNumbers.join(", ")}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.email}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {mill.registerBy?.fullName}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleView(mill._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mx-1 hover:bg-blue-600"
                      >
                        <FaRegEye title="View" />
                      </button>
                      <button
                        onClick={() => handleEdit(mill._id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md mx-1 hover:bg-yellow-600"
                      >
                        <FaEdit title="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(mill._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md mx-1 hover:bg-red-600"
                      >
                        <FaTrash title="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
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
    </div>
  );
}

export default RiceMillTable;
