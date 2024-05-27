import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterFarmer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    email: "",
    state: "",
    district: "",
    policeStation: "",
    village: "",
    pinCode: "",
    adherNumber: "",
    panNumber: "",
    gstNumber: "",
    accountNumber: "",
    ifscNumber: "",
    branchName: "",
    accountHolderName: "",
    bankName: "",
  });

  const [files, setFiles] = useState({
    profilePhoto: null,
    adherCardPhoto: null,
    panCardPhoto: null,
    bankCardPhoto: null,
    gstCardPhoto: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    Object.keys(files).forEach((key) => {
      data.append(key, files[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/registerFarmer",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire("Success", "New farmer registered successfully.", "success");
      navigate("/success");
    } catch (error) {
      console.error("There was an error!", error);
      Swal.fire("Error", "Registration failed. Please try again.", "error");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full mx-4 mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Register Farmer
      </h2>
      <div className="space-y-4">
        <p>
          <strong>Register By:</strong> {employee?.firstname}{" "}
          {employee?.lastname}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="fatherName">
                Father's Name
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="mobile">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="district">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="policeStation"
              >
                Police Station
              </label>
              <input
                type="text"
                id="policeStation"
                name="policeStation"
                value={formData.policeStation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="village">
                Village
              </label>
              <input
                type="text"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="pinCode">
                Pin Code
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="adherNumber">
                Adher Number
              </label>
              <input
                type="text"
                id="adherNumber"
                name="adherNumber"
                value={formData.adherNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="panNumber">
                PAN Number
              </label>
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="gstNumber">
                GST Number
              </label>
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="accountNumber"
              >
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="ifscNumber">
                IFSC Number
              </label>
              <input
                type="text"
                id="ifscNumber"
                name="ifscNumber"
                value={formData.ifscNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="branchName">
                Branch Name
              </label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="accountHolderName"
              >
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="bankName">
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2" htmlFor="profilePhoto">
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="adherCardPhoto"
            >
              Adher Card Photo
            </label>
            <input
              type="file"
              id="adherCardPhoto"
              name="adherCardPhoto"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2" htmlFor="panCardPhoto">
              PAN Card Photo
            </label>
            <input
              type="file"
              id="panCardPhoto"
              name="panCardPhoto"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2" htmlFor="bankCardPhoto">
              Bank Card Photo
            </label>
            <input
              type="file"
              id="bankCardPhoto"
              name="bankCardPhoto"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2" htmlFor="gstCardPhoto">
              GST Card Photo
            </label>
            <input
              type="file"
              id="gstCardPhoto"
              name="gstCardPhoto"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFarmer;
