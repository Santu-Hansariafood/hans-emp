import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditRiceMill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    riceMillName: "",
    address: "",
    state: "",
    pin: "",
    phoneNumbers: [""], // Initialize with an array containing one empty string
    email: "",
  });

  useEffect(() => {
    fetchRiceMillDetails();
  }, []);

  const fetchRiceMillDetails = async () => {
    try {
      const response = await axios.get(
        `https://main-server-2kc5.onrender.com/api/rice-mills/${id}`
      );

      const data = response.data;

      // Check if phoneNumber is available
      if (data.phoneNumber) {
        setFormData({ ...data, phoneNumbers: [data.phoneNumber] });
      } else {
        setFormData(data);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch rice mill details", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...formData.phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
  };

  const addPhoneNumber = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ""] });
  };

  const removePhoneNumber = (index) => {
    const updatedPhoneNumbers = formData.phoneNumbers.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://main-server-2kc5.onrender.com/api/rice-mills/${id}`,
        formData
      );
      Swal.fire("Success", "Rice mill details updated successfully", "success");
      navigate(-1);
    } catch (error) {
      Swal.fire("Error", "Failed to update rice mill details", "error");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Rice Mill Details</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rice Mill Name:</label>
          <input
            type="text"
            name="riceMillName"
            value={formData.riceMillName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pin:</label>
          <input
            type="text"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            maxLength={6}
            minLength={6}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">District:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Numbers:</label>
          {formData.phoneNumbers.map((phoneNumber, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
                maxLength={10}
                minLength={10}
              />
              {formData.phoneNumbers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhoneNumber(index)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPhoneNumber}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Phone Number
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email ID:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRiceMill;
