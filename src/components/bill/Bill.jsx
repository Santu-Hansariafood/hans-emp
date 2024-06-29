import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Bill = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNext = async () => {
    if (
      (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) &&
      name.trim() === ""
    ) {
      Swal.fire({
        title: "Invalid Input",
        text: "Please enter a valid 10-digit mobile number starting with 6-9 or a name.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const query = mobileNumber || name;
      const response = await fetch(
        `https://main-server-2kc5.onrender.com/api/farmers/checkMobileNumber/${query}`
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/purchase-bill", {
          state: { mobileNumber, farmerId: data.farmerId },
        });
      } else {
        const errorData = await response.json();
        if (response.status === 404) {
          navigate("/register-farmer", { state: { mobileNumber } });
        } else {
          Swal.fire({
            title: "Error",
            text: errorData.message,
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while processing. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handleBack = () => {
    Swal.fire({
      title: "Thank you!",
      text: `Navigating back to the previous page: ${document.referrer}`,
      icon: "info",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      navigate(-1);
    });
  };

  return (
    <div className="relative">
      <div className="max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
          Purchase Bill
        </h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mobileNumber"
          >
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="text"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            placeholder="Enter Farmer Mobile number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            maxLength="10"
          />
        </div>
        <h2 className="block text-gray-700 text-sm font-bold mb-2 text-center">
          or
        </h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Farmer Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
