import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Bill = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleNext = async () => {
    if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      Swal.fire({
        title: 'Invalid Mobile Number',
        text: 'Please enter a valid 10-digit mobile number starting with 6-9.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/checkMobileNumber/${mobileNumber}`);
      const data = await response.json();

      if (data.exists) {
        navigate('/purchase-bill', { state: { mobileNumber, farmerId: data.farmerId } });
      } else {
        navigate('/register-farmer', { state: { mobileNumber } });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while checking the mobile number. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleBack = () => {
    Swal.fire({
      title: 'Thank you!',
      text: `Navigating back to the previous page: ${document.referrer}`,
      icon: 'info',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      navigate(-1);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Bill</h2>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
          Mobile Number
        </label>
        <input
          id="mobileNumber"
          type="text"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          placeholder="Enter Farmer Mobile number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          maxLength="10"
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
  );
};

export default Bill;
