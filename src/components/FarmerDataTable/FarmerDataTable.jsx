import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FaRegEye, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const FarmerTable = () => {
  const [farmers, setFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editFarmer, setEditFarmer] = useState(null);
  const navigate = useNavigate();

  const farmersPerPage = 10;

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get(
        "https://main-server-2kc5.onrender.com/api/farmer-data"
      );
      setFarmers(response.data);
    } catch (error) {
      console.error("Error fetching farmers data:", error);
    }
  };

  const handleView = (farmer) => {
    Swal.fire({
      title: `${farmer.name}'s Details`,
      html: `
                <strong>Father's Name:</strong> ${farmer.fatherName}<br>
                <strong>Village:</strong> ${farmer.village}<br>
                <strong>Post:</strong> ${farmer.post}<br>
                <strong>PIN:</strong> ${farmer.pin}<br>
                <strong>District:</strong> ${farmer.district}<br>
                <strong>State:</strong> ${farmer.state}<br>
                <strong>Mobile:</strong> ${farmer.mobile}<br>
                <strong>Created At:</strong> ${new Date(
                  farmer.createdAt
                ).toLocaleString()}<br>
                <strong>Updated At:</strong> ${new Date(
                  farmer.updatedAt
                ).toLocaleString()}
            `,
      icon: "info",
    });
  };

  const handleEdit = (farmer) => {
    setEditFarmer(farmer);
    Swal.fire({
      title: "Edit Farmer",
      html: `
                <input id="name" class="swal2-input" value="${farmer.name}" placeholder="Name">
                <input id="fatherName" class="swal2-input" value="${farmer.fatherName}" placeholder="Father's Name">
                <input id="village" class="swal2-input" value="${farmer.village}" placeholder="Village">
                <input id="post" class="swal2-input" value="${farmer.post}" placeholder="Post">
                <input id="pin" class="swal2-input" value="${farmer.pin}" placeholder="PIN">
                <input id="district" class="swal2-input" value="${farmer.district}" placeholder="District">
                <input id="state" class="swal2-input" value="${farmer.state}" placeholder="State">
                <input id="mobile" class="swal2-input" value="${farmer.mobile}" placeholder="Mobile">
            `,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const updatedFarmer = {
          ...farmer,
          name: document.getElementById("name").value,
          fatherName: document.getElementById("fatherName").value,
          village: document.getElementById("village").value,
          post: document.getElementById("post").value,
          pin: document.getElementById("pin").value,
          district: document.getElementById("district").value,
          state: document.getElementById("state").value,
          mobile: document.getElementById("mobile").value,
        };
        return updatedFarmer;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `https://main-server-2kc5.onrender.com/api/farmer-data/${farmer._id}`,
            result.value
          );
          Swal.fire("Updated!", "Farmer data has been updated.", "success");
          fetchFarmers();
        } catch (error) {
          Swal.fire("Error!", "Failed to update farmer.", "error");
        }
      }
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://main-server-2kc5.onrender.com/api/farmer-data/${id}`
        );
        Swal.fire("Deleted!", "Farmer has been deleted.", "success");
        fetchFarmers();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete farmer.", "error");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const generateExcelSheet = () => {
    const ws = XLSX.utils.json_to_sheet(farmers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Farmers");
    XLSX.writeFile(wb, "farmers_data.xlsx");
  };

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.mobile.includes(searchQuery)
  );

  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const currentFarmers = filteredFarmers.slice(
    indexOfFirstFarmer,
    indexOfLastFarmer
  );

  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto my-5 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Farmer Data</h2>
        <div className="flex flex-col md:flex-row items-center">
          <input
            type="text"
            placeholder="Search by name or mobile"
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded mb-4 md:mb-0"
          />
          <button
            onClick={generateExcelSheet}
            className="ml-0 md:ml-4 bg-green-500 text-white px-4 py-2 rounded mb-4 md:mb-0"
          >
            Export to Excel
          </button>
          <button
            onClick={handleBack}
            className="ml-0 md:ml-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Father's Name</th>
              <th className="py-2 px-4">Village</th>
              <th className="py-2 px-4">Post</th>
              <th className="py-2 px-4">PIN</th>
              <th className="py-2 px-4">District</th>
              <th className="py-2 px-4">State</th>
              <th className="py-2 px-4">Mobile</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFarmers.map((farmer) => (
              <tr key={farmer._id} className="text-center">
                <td className="py-2 px-4">{farmer.name}</td>
                <td className="py-2 px-4">{farmer.fatherName}</td>
                <td className="py-2 px-4">{farmer.village}</td>
                <td className="py-2 px-4">{farmer.post}</td>
                <td className="py-2 px-4">{farmer.pin}</td>
                <td className="py-2 px-4">{farmer.district}</td>
                <td className="py-2 px-4">{farmer.state}</td>
                <td className="py-2 px-4">{farmer.mobile}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleView(farmer)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    <FaRegEye title="View" />
                  </button>
                  <button
                    onClick={() => handleEdit(farmer)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    <FaEdit title="Edit" />
                  </button>
                  <button
                    onClick={() => handleDelete(farmer._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <MdDeleteForever title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } mx-1 rounded`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default FarmerTable;
