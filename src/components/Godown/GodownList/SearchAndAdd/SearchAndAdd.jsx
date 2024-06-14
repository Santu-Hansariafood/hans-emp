import React from "react";
import { CiCirclePlus } from "react-icons/ci";

const SearchAndAdd = ({ searchTerm, handleSearch, handleAddNew }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search godowns..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleAddNew}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <CiCirclePlus className="inline-block mr-1" /> Add New Godown
        </button>
      </div>
    </div>
  );
};

export default SearchAndAdd;
