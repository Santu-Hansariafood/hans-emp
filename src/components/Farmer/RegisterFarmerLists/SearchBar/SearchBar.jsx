import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="flex items-center mt-4 sm:mt-0 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
        className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300"
      >
        <IoIosSearch className="h-6 w-6" />
      </button>
    </div>
  );
};

export default SearchBar;
