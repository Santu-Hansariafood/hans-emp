import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or company..."
      onChange={handleSearch}
      className="border rounded px-4 py-2"
    />
  );
};

export default SearchBar;
