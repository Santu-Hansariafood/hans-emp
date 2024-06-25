import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { FiSearch } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";

const LoadingEntry = () => {
  const [supplier, setSupplier] = useState(null);
  const [consignee, setConsignee] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);

  const supplierOptions = [
    { value: "supplier1", label: "Supplier 1" },
    { value: "supplier2", label: "Supplier 2" },
    // Add more supplier options as needed
  ];

  const consigneeOptions = [
    { value: "consignee1", label: "Consignee 1" },
    { value: "consignee2", label: "Consignee 2" },
    // Add more consignee options as needed
  ];

  const handleSearch = () => {
    // Implement search functionality here
    console.log("Searching with:", { supplier, consignee, deliveryDate });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Generate Main Loading Entry</h2>
      <div className="flex flex-col md:flex-row items-end md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Supplier <span className="text-red-500">*</span>
          </label>
          <Select
            options={supplierOptions}
            value={supplier}
            onChange={setSupplier}
            placeholder="Choose Supplier..."
            className="w-full"
            styles={{ container: (provided) => ({ ...provided, height: '100%' }) }}
          />
        </div>
        <div className="w-full md:flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Consignee <span className="text-red-500">*</span>
          </label>
          <Select
            options={consigneeOptions}
            value={consignee}
            onChange={setConsignee}
            placeholder="Choose Consignee..."
            className="w-full"
            styles={{ container: (provided) => ({ ...provided, height: '100%' }) }}
          />
        </div>
        <div className="w-full md:flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Date
          </label>
          <DatePicker
            selected={deliveryDate}
            onChange={(date) => setDeliveryDate(date)}
            dateFormat="MMMM d, yyyy"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholderText="Choose Date"
          />
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto flex items-center justify-center"
            style={{ height: '42px' }}
          >
            <FiSearch title="Search"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingEntry;
