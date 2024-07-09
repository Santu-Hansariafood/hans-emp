import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ConsigneeRow = ({ consignee, handleEdit, handleDelete }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="p-2 border-b">{consignee.name}</td>
      <td className="p-2 border-b">{consignee.mobile}</td>
      <td className="p-2 border-b">{consignee.email}</td>
      <td className="p-2 border-b">{consignee.address}</td>
      <td className="p-2 border-b">{consignee.gstNo}</td>
      <td className="p-2 border-b">{consignee.panNo}</td>
      <td className="p-2 border-b">{consignee.state}</td>
      <td className="p-2 border-b">{consignee.location}</td>
      <td className="p-2 border-b">
        <button onClick={() => handleEdit(consignee)} className="mr-2 text-blue-500">
          <FaEdit />
        </button>
        <button onClick={() => handleDelete(consignee._id)} className="text-red-500">
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  );
};

export default ConsigneeRow;
