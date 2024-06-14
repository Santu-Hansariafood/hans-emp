import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const CompanyTable = ({ companies, handleView, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Billing Address</th>
            <th className="py-2 px-4 border-b">GST No.</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td className="py-2 px-4 border-b">{company.companyName}</td>
              <td className="py-2 px-4 border-b">{company.location}</td>
              <td className="py-2 px-4 border-b">{company.billingAddress}</td>
              <td className="py-2 px-4 border-b">{company.gstNo}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleView(company)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  <FaRegEye title="View" />
                </button>
                <button
                  onClick={() => handleEdit(company)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  <CiEdit title="Edit" />
                </button>
                <button
                  onClick={() => handleDelete(company._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  <MdDeleteForever title="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
