import React from "react";

const FarmerDetails = ({ farmerData }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Farmer Account Details:
    </label>
    <div className="mt-1 p-2 border border-gray-300 rounded-md">
      {farmerData.accountHolderName && (
        <p><strong>Account Holder Name:</strong> {farmerData.accountHolderName}</p>
      )}
      {farmerData.bankName && (
        <p><strong>Bank Name:</strong> {farmerData.bankName}</p>
      )}
      {farmerData.branchName && (
        <p><strong>Branch Name:</strong> {farmerData.branchName}</p>
      )}
      {farmerData.accountNumber && (
        <p><strong>Account Number:</strong> {farmerData.accountNumber}</p>
      )}
      {farmerData.ifscNumber && (
        <p><strong>IFSC Number:</strong> {farmerData.ifscNumber}</p>
      )}
    </div>
  </div>
);

export default FarmerDetails;
