import React, { useState, useEffect } from "react";
import axios from "axios";

const BuyerFormFields = ({
  formData,
  handleChange,
  handleProductChange,
  handleRemoveProduct,
  handleAddConsignee,
  handleRemoveConsignee,
  cities,
  states,
  products,
}) => {
  const [consignees, setConsignees] = useState([]);

  useEffect(() => {
    const fetchConsignees = async () => {
      try {
        const response = await axios.get(
          "https://main-server-2kc5.onrender.com/api/consignees"
        );
        setConsignees(response.data);
      } catch (error) {
        console.error("Error fetching consignees:", error);
      }
    };
    fetchConsignees();
  }, []);

  const handleConsigneeChange = (e) => {
    const selectedConsignee = e.target.value;
    handleAddConsignee(selectedConsignee);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="block">
            Name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block">
            Mobile :
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="password" className="block">
            Password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="gstNo" className="block">
            GST No :
          </label>
          <input
            type="text"
            id="gstNo"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            placeholder="GST No"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="billingAddress" className="block">
            Billing Address :
          </label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            placeholder="Billing Address"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="panNo" className="block">
            PAN No :
          </label>
          <input
            type="text"
            id="panNo"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            placeholder="PAN No"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="bidingLocations" className="block">
            Biding Locations :
          </label>
          <input
            type="text"
            id="bidingLocations"
            name="bidingLocations"
            value={formData.bidingLocations}
            onChange={handleChange}
            placeholder="Biding Locations"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block">Delivery Address :</label>
          <select
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Select Delivery Address</option>
            {consignees.map((consignee) => (
              <option
                key={consignee._id}
                value={`${consignee.address}, ${consignee.location}, ${consignee.state}`}
              >
                {consignee.address}, {consignee.location}, {consignee.state}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Products
          </label>
          <select
            value=""
            onChange={handleProductChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="" disabled>
              Select Product
            </option>
            {products.map((product) => (
              <option key={product._id} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>
          <div className="mt-2">
            {formData.products.map((product, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-lg flex justify-between items-center mb-2"
              >
                {product}
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Group of Company
          </label>
          <select
            value=""
            onChange={handleConsigneeChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="" disabled>
              Group of Company
            </option>
            {consignees.map((consignee) => (
              <option key={consignee._id} value={consignee.name}>
                {consignee.name}
              </option>
            ))}
          </select>
          <div className="mt-2">
            {formData.consignees.map((consignee, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-lg flex justify-between items-center mb-2"
              >
                {consignee}
                <button
                  type="button"
                  onClick={() => handleRemoveConsignee(consignee)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            District
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Select District</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BuyerFormFields;
