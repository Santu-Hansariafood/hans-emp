import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddSelfCompany = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyLocation: '',
    gstNo: '',
    panNo: '',
    companyLogo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post('https://main-server-2kc5.onrender.com/api/self-company', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Company details added successfully',
        text: response.data.message,
      });
      setFormData({
        companyName: '',
        companyAddress: '',
        companyLocation: '',
        gstNo: '',
        panNo: '',
        companyLogo: null,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error adding company details',
        text: error.response?.data?.message || 'An error occurred',
      });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-green-200 via-indigo-100 to-green-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
        Add Self Company Details
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="companyAddress" className="block">Company Address:</label>
            <input
              type="text"
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="Company Address"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="companyLocation" className="block">Company Location:</label>
            <input
              type="text"
              id="companyLocation"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleChange}
              placeholder="Company Location"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="gstNo" className="block">GST Number:</label>
            <input
              type="text"
              id="gstNo"
              name="gstNo"
              value={formData.gstNo}
              onChange={handleChange}
              placeholder="GST Number"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="panNo" className="block">PAN Card Number:</label>
            <input
              type="text"
              id="panNo"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              placeholder="PAN Card Number"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="companyLogo" className="block">Upload Company Logo:</label>
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              onChange={handleFileChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSelfCompany;
