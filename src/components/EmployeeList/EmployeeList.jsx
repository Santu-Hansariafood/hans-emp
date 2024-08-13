import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import Pagination from "./Pagination/Pagination";
import SearchBar from "./SearchBar/SearchBar";
import {FaHome } from "react-icons/fa"

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://main-server-2kc5.onrender.com/api/employees"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleView = (employee) => {
    Swal.fire({
      title: `${employee.firstname} ${employee.lastname}`,
      html: `
        <p><strong>Employee ID:</strong> ${employee.employeeId}</p>
        <p><strong>Email:</strong> ${employee.email}</p>
        <p><strong>Mobile:</strong> ${employee.mobile}</p>
        <p><strong>Role:</strong> ${employee.role}</p>
      `,
      focusConfirm: false,
      confirmButtonText: "Close",
    });
  };

  const handleEdit = (employee) => {
    Swal.fire({
      title: "Edit Employee",
      html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="First Name" value="${employee.firstname}">
        <input type="text" id="swal-input2" class="swal2-input" placeholder="Last Name" value="${employee.lastname}">
        <input type="text" id="swal-input3" class="swal2-input" placeholder="Role" value="${employee.role}">
        <input type="text" id="swal-input4" class="swal2-input" placeholder="Email" value="${employee.email}">
        <input type="text" id="swal-input5" class="swal2-input" placeholder="Mobile" value="${employee.mobile}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Update",
      preConfirm: async () => {
        const updatedEmployee = {
          firstname: document.getElementById("swal-input1").value,
          lastname: document.getElementById("swal-input2").value,
          role: document.getElementById("swal-input3").value,
          email: document.getElementById("swal-input4").value,
          mobile: document.getElementById("swal-input5").value,
        };
        try {
          await axios.put(
            `https://main-server-2kc5.onrender.com/api/employees/${employee._id}`,
            updatedEmployee
          );
          Swal.fire(
            "Updated!",
            `Employee with ID: ${employee._id} has been updated.`,
            "success"
          );
          fetchEmployees();
        } catch (error) {
          console.error("Error updating employee:", error);
          Swal.fire(
            "Error!",
            "There was a problem updating the employee",
            "error"
          );
        }
      },
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://main-server-2kc5.onrender.com/api/employees/${id}`);
          setEmployees(employees.filter((employee) => employee._id !== id));
          Swal.fire(
            "Deleted!",
            `Employee with ID: ${id} has been deleted.`,
            "success"
          );
        } catch (error) {
          console.error("Error deleting employee:", error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the employee",
            "error"
          );
        }
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstname.toLowerCase().includes(searchTerm) ||
      employee.lastname.toLowerCase().includes(searchTerm)
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < filteredEmployees.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <EmployeeTable
        employees={paginatedEmployees}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        isNextDisabled={currentPage * pageSize >= filteredEmployees.length}
      />
      <div className="flex justify-between items-center mt-4">
      <button
            type="button"
            onClick={() => navigate("/work-details")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            <FaHome title="Back to dashboard" />
          </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
