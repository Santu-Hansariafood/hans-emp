import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import InputField from "./InputField/InputField";
import FileInput from "./FileInput/FileInput";
import FormSection from "./FormSection/FormSection";

const RegisterFarmer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fullName } = location.state || {};

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
    password: "",
    verifiedBy: fullName,
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
      if (files[key]) {
        data.append(key, files[key]);
      }
    });

    console.log("Form data before submission:", formData);
    console.log("Files before submission:", files);

    try {
      const response = await axios.post(
        "https://main-server-2kc5.onrender.com/api/farmers/registerFarmer",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire("Success", "New farmer registered successfully.", "success");
      navigate("/register-farmer-lists");
    } catch (error) {
      console.error("There was an error!", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full mx-4 mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
        Register Farmer
      </h2>
      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-700">
          <strong>Veryfied By:</strong> {fullName}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormSection>
            <InputField
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
            />
            <InputField
              id="fatherName"
              label="Father Name"
              value={formData.fatherName}
              onChange={handleInputChange}
              placeholder="Enter Father Name"
            />
            <InputField
              id="mobile"
              label="Mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              maxLength={10}
              minLength={10}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
            />
            <InputField
              id="state"
              label="State"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter State"
            />
            <InputField
              id="district"
              label="District"
              value={formData.district}
              onChange={handleInputChange}
              placeholder="Enter District"
            />
            <InputField
              id="policeStation"
              label="Police Station"
              value={formData.policeStation}
              onChange={handleInputChange}
              placeholder="Enter Police Station"
            />
            <InputField
              id="village"
              label="Village"
              value={formData.village}
              onChange={handleInputChange}
              placeholder="Enter Village"
            />
            <InputField
              id="pinCode"
              label="Pin Code"
              value={formData.pinCode}
              onChange={handleInputChange}
              placeholder="Enter Pin Code"
              maxLength={6}
              minLength={6}
            />
            <InputField
              id="adherNumber"
              label="Adher Number"
              value={formData.adherNumber}
              onChange={handleInputChange}
              placeholder="Enter Adher Number"
              maxLength={12}
              minLength={12}
            />
            <InputField
              id="panNumber"
              label="Pan Number"
              value={formData.panNumber}
              onChange={handleInputChange}
              placeholder="Enter Pan Number"
            />
            <InputField
              id="gstNumber"
              label="GST Number"
              value={formData.gstNumber}
              onChange={handleInputChange}
              placeholder="Enter GST Number"
            />
            <InputField
              id="accountNumber"
              label="Account Number"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter Account Number"
            />
            <InputField
              id="ifscNumber"
              label="IFSC Number"
              value={formData.ifscNumber}
              onChange={handleInputChange}
              placeholder="Enter IFSC Number"
            />
            <InputField
              id="branchName"
              label="Branch Name"
              value={formData.branchName}
              onChange={handleInputChange}
              placeholder="Enter Branch Name"
            />
            <InputField
              id="accountHolderName"
              label="Account Holder Name"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              placeholder="Enter Account Holder Name"
            />
            <InputField
              id="bankName"
              label="Bank Name"
              value={formData.bankName}
              onChange={handleInputChange}
              placeholder="Enter Bank Name"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
            />
          </FormSection>
          <FormSection>
            <FileInput
              id="profilePhoto"
              label="Profile Photo"
              onChange={handleFileChange}
            />
            <FileInput
              id="adherCardPhoto"
              label="Adher Card Photo"
              onChange={handleFileChange}
            />
            <FileInput
              id="panCardPhoto"
              label="Pan Card Photo"
              onChange={handleFileChange}
            />
            <FileInput
              id="bankCardPhoto"
              label="Bank Card Photo"
              onChange={handleFileChange}
            />
            <FileInput
              id="gstCardPhoto"
              label="GST Card Photo"
              onChange={handleFileChange}
            />
          </FormSection>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
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
