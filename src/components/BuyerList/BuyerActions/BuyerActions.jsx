import React from "react";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const BuyerActions = ({ buyer, handleView, handleEdit, handleDelete }) => {
  return (
    <>
      <button
        onClick={() => handleView(buyer)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      >
        <FaRegEye title="View" />
      </button>
      <button
        onClick={() => handleEdit(buyer)}
        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
      >
        <CiEdit title="Edit" />
      </button>
      <button
        onClick={() => handleDelete(buyer._id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        <MdDeleteForever title="Delete" />
      </button>
    </>
  );
};

export default BuyerActions;
