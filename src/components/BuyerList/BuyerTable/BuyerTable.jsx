import React from "react";
import BuyerActions from "../BuyerActions/BuyerActions";

const BuyerTable = ({ buyers, handleView, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gradient-to-r from-green-400 to-yellow-500 text-white">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">GST No</th>
            <th className="py-2 px-4 border-b">Billing Address</th>
            <th className="py-2 px-4 border-b">Shipping Address</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer) => (
            <tr key={buyer._id}>
              <td className="py-2 px-4 border-b">{buyer.name}</td>
              <td className="py-2 px-4 border-b">{buyer.mobile}</td>
              <td className="py-2 px-4 border-b">{buyer.email}</td>
              <td className="py-2 px-4 border-b">{buyer.companyName}</td>
              <td className="py-2 px-4 border-b">{buyer.location}</td>
              <td className="py-2 px-4 border-b">{buyer.gstNo}</td>
              <td className="py-2 px-4 border-b">{buyer.billingAddress}</td>
              <td className="py-2 px-4 border-b">{buyer.shippingAddress}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <BuyerActions
                  buyer={buyer}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerTable;
