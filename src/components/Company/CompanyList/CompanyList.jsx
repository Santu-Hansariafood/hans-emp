import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://main-server-9oo9.onrender.com/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleView = (company) => {
    Swal.fire({
      title: 'View Company',
      html: `
        <p><strong>Company Name:</strong> ${company.companyName}</p>
        <p><strong>Location:</strong> ${company.location}</p>
        <p><strong>Billing Address:</strong> ${company.billingAddress}</p>
        <p><strong>GST No.:</strong> ${company.gstNo}</p>
      `,
      focusConfirm: false,
      confirmButtonText: 'Close'
    });
  };

  const handleEdit = (company) => {
    Swal.fire({
      title: 'Edit Company',
      html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Company Name" value="${company.companyName}">
        <input type="text" id="swal-input2" class="swal2-input" placeholder="Location" value="${company.location}">
        <input type="text" id="swal-input3" class="swal2-input" placeholder="Billing Address" value="${company.billingAddress}">
        <input type="text" id="swal-input4" class="swal2-input" placeholder="GST No." value="${company.gstNo}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Update',
      preConfirm: async () => {
        const updatedCompany = {
          companyName: document.getElementById('swal-input1').value,
          location: document.getElementById('swal-input2').value,
          billingAddress: document.getElementById('swal-input3').value,
          gstNo: document.getElementById('swal-input4').value,
        };
        try {
          await axios.put(`https://main-server-9oo9.onrender.com/companies/${company._id}`, updatedCompany);
          Swal.fire('Updated!', `Company with ID: ${company._id} has been updated.`, 'success');
          fetchCompanies();
        } catch (error) {
          console.error('Error updating company:', error);
          Swal.fire('Error!', 'There was a problem updating the company', 'error');
        }
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://main-server-9oo9.onrender.com/companies/${id}`);
          Swal.fire('Deleted!', `Company with ID: ${id} has been deleted.`, 'success');
          setCompanies(companies.filter(company => company._id !== id));
        } catch (error) {
          console.error('Error deleting company:', error);
          Swal.fire('Error!', 'There was a problem deleting the company', 'error');
        }
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredCompanies = companies.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm)
  );

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < filteredCompanies.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Company Master</h2>
        <input
          type="text"
          placeholder="Search by company name"
          className="border rounded py-2 px-3"
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Billing Address</th>
              <th className="py-2 px-4 border-b">GST No.</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.map((company) => (
              <tr key={company._id}>
                <td className="py-2 px-4 border-b">{company.companyName}</td>
                <td className="py-2 px-4 border-b">{company.location}</td>
                <td className="py-2 px-4 border-b">{company.billingAddress}</td>
                <td className="py-2 px-4 border-b">{company.gstNo}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => handleView(company)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    <FaRegEye title='View'/>
                  </button>
                  <button
                    onClick={() => handleEdit(company)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    <CiEdit title='Edit'/>
                  </button>
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    <MdDeleteForever title='Delete'/>
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
          disabled={currentPage * pageSize >= filteredCompanies.length}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompanyList;
