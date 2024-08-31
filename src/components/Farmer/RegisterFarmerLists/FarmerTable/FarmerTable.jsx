import React from "react";
import { FaRegEye } from "react-icons/fa";

const FarmerTable = ({ farmers, handleViewDetails }) => {
  return (
    <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-green-400 to-yellow-500 text-white">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Father's Name</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">State</th>
            <th className="py-2 px-4 border-b">District</th>
            <th className="py-2 px-4 border-b">Police Station</th>
            <th className="py-2 px-4 border-b">Village</th>
            <th className="py-2 px-4 border-b">Pin Code</th>
            <th className="py-2 px-4 border-b">Aadhaar Number</th>
            <th className="py-2 px-4 border-b">PAN Number</th>
            <th className="py-2 px-4 border-b">GST Number</th>
            <th className="py-2 px-4 border-b">Account Number</th>
            <th className="py-2 px-4 border-b">IFSC Number</th>
            <th className="py-2 px-4 border-b">Branch Name</th>
            <th className="py-2 px-4 border-b">Account Holder Name</th>
            <th className="py-2 px-4 border-b">Bank Name</th>
            <th className="py-2 px-4 border-b">Veryfied By</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {farmers.length > 0 ? (
            farmers.map((farmer) => (
              <tr key={farmer._id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-2 px-4 border-b">{farmer.name}</td>
                <td className="py-2 px-4 border-b">{farmer.fatherName}</td>
                <td className="py-2 px-4 border-b">{farmer.mobile}</td>
                <td className="py-2 px-4 border-b">{farmer.email}</td>
                <td className="py-2 px-4 border-b">{farmer.state}</td>
                <td className="py-2 px-4 border-b">{farmer.district}</td>
                <td className="py-2 px-4 border-b">{farmer.policeStation}</td>
                <td className="py-2 px-4 border-b">{farmer.village}</td>
                <td className="py-2 px-4 border-b">{farmer.pinCode}</td>
                <td className="py-2 px-4 border-b">{farmer.adherNumber}</td>
                <td className="py-2 px-4 border-b">{farmer.panNumber}</td>
                <td className="py-2 px-4 border-b">{farmer.gstNumber}</td>
                <td className="py-2 px-4 border-b">{farmer.accountNumber}</td>
                <td className="py-2 px-4 border-b">{farmer.ifscNumber}</td>
                <td className="py-2 px-4 border-b">{farmer.branchName}</td>
                <td className="py-2 px-4 border-b">{farmer.accountHolderName}</td>
                <td className="py-2 px-4 border-b">{farmer.bankName}</td>
                <td className="py-2 px-4 border-b">{farmer.verifiedBy}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleViewDetails(farmer._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg transition duration-300"
                  >
                    <FaRegEye title="View" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="17" className="py-2 px-4 text-center border-b">
                No farmers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerTable;
