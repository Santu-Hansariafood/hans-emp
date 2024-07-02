import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const SelfCompanyMaster = () => {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://main-server-2kc5.onrender.com/api/self-company');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleView = (company) => {
    Swal.fire({
      title: `<strong>Company Details</strong>`,
      html: `
        <p><strong>Company Name:</strong> ${company.companyName}</p>
        <p><strong>Company Address:</strong> ${company.companyAddress}</p>
        <p><strong>Company Location:</strong> ${company.companyLocation}</p>
        <p><strong>GST Number:</strong> ${company.gstNo}</p>
        <p><strong>PAN Card Number:</strong> ${company.panNo}</p>
        <p><strong>Company Logo:</strong> <img src="${company.companyLogo}" alt="Company Logo" style="max-width: 100px;"></p>
      `,
      icon: 'info',
    });
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    Swal.fire({
      title: 'Edit Company',
      html: `
        <input type="text" id="companyName" class="swal2-input" placeholder="Company Name" value="${company.companyName}">
        <input type="text" id="companyAddress" class="swal2-input" placeholder="Company Address" value="${company.companyAddress}">
        <input type="text" id="companyLocation" class="swal2-input" placeholder="Company Location" value="${company.companyLocation}">
        <input type="text" id="gstNo" class="swal2-input" placeholder="GST Number" value="${company.gstNo}">
        <input type="text" id="panNo" class="swal2-input" placeholder="PAN Card Number" value="${company.panNo}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const companyName = Swal.getPopup().querySelector('#companyName').value;
        const companyAddress = Swal.getPopup().querySelector('#companyAddress').value;
        const companyLocation = Swal.getPopup().querySelector('#companyLocation').value;
        const gstNo = Swal.getPopup().querySelector('#gstNo').value;
        const panNo = Swal.getPopup().querySelector('#panNo').value;
        return { ...company, companyName, companyAddress, companyLocation, gstNo, panNo };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCompany = result.value;
        handleUpdate(updatedCompany);
      }
    });
  };

  const handleUpdate = async (company) => {
    try {
      await axios.put(`https://main-server-2kc5.onrender.com/api/self-company/${company._id}`, company);
      setCompanies(companies.map(c => (c._id === company._id ? company : c)));
      Swal.fire('Updated!', 'Company details have been updated.', 'success');
    } catch (error) {
      console.error('Error updating company:', error);
      Swal.fire('Error!', 'Error updating the company.', 'error');
    }
  };

  const handleDelete = (companyId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://main-server-2kc5.onrender.com/api/self-company/${companyId}`)
          .then(() => {
            setCompanies(companies.filter(company => company._id !== companyId));
            Swal.fire('Deleted!', 'Your company has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Error deleting the company.', 'error');
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-200 via-indigo-100 to-blue-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
        Self Company Master
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Company Address</th>
              <th className="py-2 px-4 border-b">Company Location</th>
              <th className="py-2 px-4 border-b">GST Number</th>
              <th className="py-2 px-4 border-b">PAN Card Number</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td className="py-2 px-4 border-b">{company.companyName}</td>
                <td className="py-2 px-4 border-b">{company.companyAddress}</td>
                <td className="py-2 px-4 border-b">{company.companyLocation}</td>
                <td className="py-2 px-4 border-b">{company.gstNo}</td>
                <td className="py-2 px-4 border-b">{company.panNo}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleView(company)}
                    className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2"
                  >
                    <FaEye title='View'/>
                  </button>
                  <button
                    onClick={() => handleEdit(company)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2"
                  >
                    <FaEdit title='Edit'/>
                  </button>
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    <FaTrash title='Delete'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelfCompanyMaster;
