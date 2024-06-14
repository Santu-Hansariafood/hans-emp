import React from "react";

const PaginationControls = ({
  currentPage,
  handlePreviousPage,
  handleNextPage,
  totalItems,
  pageSize,
  navigate,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex space-x-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
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
        disabled={currentPage * pageSize >= totalItems}
        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
