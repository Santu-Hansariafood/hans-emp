import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import * as XLSX from "xlsx";
import { FaEye } from "react-icons/fa";

const TravelList = () => {
  const navigate = useNavigate();
  const [travelDetails, setTravelDetails] = useState([]);
  const [filteredTravelDetails, setFilteredTravelDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsPerPage] = useState(10);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchTravelDetails = async () => {
      try {
        const response = await axios.get(
          "https://main-server-2kc5.onrender.com/api/travel-details/travel-details"
        );
        setTravelDetails(response.data);
        setFilteredTravelDetails(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch travel details",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://main-server-2kc5.onrender.com/api/employees"
        );
        const employeeList = response.data.map(
          (emp) => `${emp.firstname} ${emp.lastname}`
        );
        setEmployees(employeeList);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch employee list",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    };

    fetchTravelDetails();
    fetchEmployees();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleView = (id) => {
    const detail = travelDetails.find((item) => item._id === id);
    Swal.fire({
      title: "Travel Detail",
      html: `
        <p><strong>Employee Name:</strong> ${detail.employeeName}</p>
        <p><strong>Start Reading:</strong> ${detail.startReading}</p>
        <p><strong>End Reading:</strong> ${detail.endReading}</p>
        <p><strong>Date:</strong> ${detail.date}</p>
        <p><strong>Total Distance Covered:</strong> ${
          detail.endReading - detail.startReading
        }</p>
      `,
      confirmButtonColor: "#3085d6",
    });
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTravelDetails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TravelDetails");
    XLSX.writeFile(workbook, "TravelDetails.xlsx");
  };

  // Filter logic
  const handleFilterChange = () => {
    let filtered = [...travelDetails];

    if (selectedEmployee) {
      filtered = filtered.filter(
        (detail) => detail.employeeName === selectedEmployee
      );
    }

    setFilteredTravelDetails(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedEmployee]);

  // Pagination logic
  const indexOfLastDetail = currentPage * detailsPerPage;
  const indexOfFirstDetail = indexOfLastDetail - detailsPerPage;
  const currentDetails = filteredTravelDetails.slice(
    indexOfFirstDetail,
    indexOfLastDetail
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredTravelDetails.length / detailsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
      <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
        Travel List
      </h2>
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <label htmlFor="employeeFilter" className="mr-2 font-bold">
            Filter by Employee:
          </label>
          <select
            id="employeeFilter"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-auto"
          >
            <option value="">All Employees</option>
            {employees.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                Employee Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                Start Reading
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                End Reading
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                Total Distance Covered
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDetails.map((detail) => (
              <tr key={detail._id}>
                <td className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                  {detail.employeeName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                  {detail.startReading}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                  {detail.endReading}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                  {detail.date}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                  {detail.endReading - detail.startReading}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-xs sm:text-sm">
                  <button
                    onClick={() => handleView(detail._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg transition duration-300"
                  >
                    <FaEye title="View" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 flex-wrap">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`mx-1 px-3 py-1 border rounded text-xs sm:text-sm ${
              number === currentPage
                ? "bg-green-500 text-white"
                : "bg-white text-green-500"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="flex justify-center sm:justify-end mt-4">
        <button
          onClick={handleBack}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition duration-300 mb-2 sm:mb-0"
        >
          Back
        </button>
        <button
          onClick={generateExcel}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition duration-300 ml-2"
        >
          Generate Excel
        </button>
      </div>
    </div>
  );
};

export default TravelList;
