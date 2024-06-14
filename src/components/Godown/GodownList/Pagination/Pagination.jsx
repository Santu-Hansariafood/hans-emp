import React from "react";

const Pagination = ({
  currentPage,
  handleNextPage,
  handlePreviousPage,
  filteredCollections,
  itemsPerPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={
          currentPage >= Math.ceil(filteredCollections.length / itemsPerPage)
        }
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
