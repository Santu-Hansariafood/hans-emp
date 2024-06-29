import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ConsigneeRow = ({ group, handleEdit, handleDelete }) => {
  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="p-2 border-b" rowSpan={group.consignees.length}>
          {group.companyName}
        </td>
        <td className="p-2 border-b">{group.consignees[0].name}</td>
        <td className="p-2 border-b">{group.consignees[0].mobile}</td>
        <td className="p-2 border-b">{group.consignees[0].email}</td>
        <td className="p-2 border-b">{group.consignees[0].address}</td>
        <td className="p-2 border-b">{group.consignees[0].gstNo}</td>
        <td className="p-2 border-b">{group.consignees[0].panNo}</td>
        <td className="p-2 border-b">{group.consignees[0].state}</td>
        <td className="p-2 border-b">{group.consignees[0].location}</td>
        <td className="p-2 border-b">
          <button
            onClick={() => handleEdit(group.consignees[0])}
            className="p-1 bg-blue-500 text-white rounded mr-2"
          >
            <FaEdit title="Edit" />
          </button>
          <button
            onClick={() => handleDelete(group.consignees[0]._id)}
            className="p-1 bg-red-500 text-white rounded"
          >
            <MdDeleteForever title="Delete" />
          </button>
        </td>
      </tr>
      {group.consignees.slice(1).map((consignee, idx) => (
        <tr key={idx} className="hover:bg-gray-100">
          <td className="p-2 border-b">{consignee.name}</td>
          <td className="p-2 border-b">{consignee.mobile}</td>
          <td className="p-2 border-b">{consignee.email}</td>
          <td className="p-2 border-b">{consignee.address}</td>
          <td className="p-2 border-b">{consignee.gstNo}</td>
          <td className="p-2 border-b">{consignee.panNo}</td>
          <td className="p-2 border-b">{consignee.state}</td>
          <td className="p-2 border-b">{consignee.location}</td>
          <td className="p-2 border-b flex">
            <button
              onClick={() => handleEdit(consignee)}
              className="p-1 bg-blue-500 text-white rounded mr-2"
            >
              <FaEdit title="Edit" />
            </button>
            <button
              onClick={() => handleDelete(consignee._id)}
              className="p-1 bg-red-500 text-white rounded"
            >
              <MdDeleteForever title="Delete" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ConsigneeRow;
