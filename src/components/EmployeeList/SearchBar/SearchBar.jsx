import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name"
      className="border rounded py-2 px-3"
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
