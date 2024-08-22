import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search by name or company..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border rounded px-4 py-2"
    />
  );
};

export default SearchBar;
