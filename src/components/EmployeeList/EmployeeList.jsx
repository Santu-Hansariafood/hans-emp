import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

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
        "http://localhost:3000/employeeRegister"
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
            `http://localhost:3000/employeeRegister/${employee._id}`,
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
          await axios.delete(`http://localhost:3000/employeeRegister/${id}`);
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
        <input
          type="text"
          placeholder="Search by name"
          className="border rounded py-2 px-3"
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Employee ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className="py-2 px-4 border-b">{employee.employeeId}</td>
                <td className="py-2 px-4 border-b">{employee.firstname}</td>
                <td className="py-2 px-4 border-b">{employee.lastname}</td>
                <td className="py-2 px-4 border-b">{employee.role}</td>
                <td className="py-2 px-4 border-b">{employee.email}</td>
                <td className="py-2 px-4 border-b">{employee.mobile}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => handleView(employee)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    <FaRegEye title="View" />
                  </button>
                  <button
                    onClick={() => handleEdit(employee)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    <CiEdit title="Edit" />
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    <MdDeleteForever title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
        </div>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * pageSize >= filteredEmployees.length}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
