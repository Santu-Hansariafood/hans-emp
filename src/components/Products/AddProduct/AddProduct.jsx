import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const [formData, setFormData] = useState({ productName: '', productCode: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit the product details?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('https://main-server-2kc5.onrender.com/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            Swal.fire('Submitted!', 'Your product details have been submitted.', 'success');
            navigate('/product-master');
          } else {
            Swal.fire('Error!', 'Failed to submit product details.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while submitting product details.', 'error');
        }
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required="true"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="productCode" className="block text-gray-700 font-semibold mb-2">Product Code:</label>
          <input
            type="text"
            id="productCode"
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            required="true"
            placeholder="Enter product code"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
