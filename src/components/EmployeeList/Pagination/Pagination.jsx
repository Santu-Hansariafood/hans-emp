import React from "react";

const Pagination = ({
  currentPage,
  handlePreviousPage,
  handleNextPage,
  isNextDisabled,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
      </div>
      <span>Page {currentPage}</span>
      <button
        onClick={handleNextPage}
        disabled={isNextDisabled}
        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
