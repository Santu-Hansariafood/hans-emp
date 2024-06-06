import React from "react";

const LorryDetails = ({ lorryNumber, setLorryNumber, productName }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Lorry Number (9 digits):
    </label>
    <input
      type="text"
      value={lorryNumber}
      onChange={(e) => setLorryNumber(e.target.value)}
      pattern="\d{9}"
      maxLength="9"
      required
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
    />
    <label className="block text-sm font-medium text-gray-700 mt-4">
      Product Name:
    </label>
    <input
      type="text"
      value={productName}
      readOnly
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
    />
  </div>
);

export default LorryDetails;
