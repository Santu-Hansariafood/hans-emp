import React from "react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="mt-4 flex justify-center">
      <ul className="inline-flex items-center -space-x-px">
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`cursor-pointer ${
              currentPage === index + 1 ? "text-blue-500" : ""
            }`}
          >
            <button
              onClick={() => handlePageChange(index + 1)}
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
