import React from "react";

const LorryDetails = ({ lorryNumber, setLorryNumber, productName, company, setCompany }) => (
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
    <label className="block text-sm font-medium text-gray-700 mt-4">
      Select Company
    </label>
    <select
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      required
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="" disabled>Select a company</option>
      <option value="Hansaria Food Private Limited">Hansaria Food Private Limited</option>
      <option value="Agri Rise Private Limited">Agri Rise Private Limited</option>
      <option value="Shambhu Trading Co.">Shambhu Trading Co.</option>
      <option value="Balaji Enterprise">Balaji Enterprise</option>
      <option value="Shavans Trading Co">Shavans Trading Co</option>
    </select>
  </div>
);

export default LorryDetails;
