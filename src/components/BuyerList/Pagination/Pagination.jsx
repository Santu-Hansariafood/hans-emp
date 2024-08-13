import React from "react";
import { FaHome } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  handlePreviousPage,
  handleNextPage,
  navigate,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => navigate("/work-details")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          <FaHome title="Back to dashboard" />
        </button>
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

export default Pagination;
