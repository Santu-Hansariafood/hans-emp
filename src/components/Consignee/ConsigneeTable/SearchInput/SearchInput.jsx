import React from "react";

const SearchInput = ({ searchInput, handleSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search by name"
        className="p-2 border border-gray-300 rounded w-full md:w-1/3"
      />
    </div>
  );
};

export default SearchInput;
