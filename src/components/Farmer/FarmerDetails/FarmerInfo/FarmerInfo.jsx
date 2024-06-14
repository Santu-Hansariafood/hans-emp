import React from "react";

const FarmerInfo = ({ farmer }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-right font-semibold text-gray-600">
        <p>Name:</p>
        <p>Father's Name:</p>
        <p>Mobile:</p>
        <p>Email:</p>
        <p>State:</p>
        <p>District:</p>
        <p>Police Station:</p>
        <p>Village:</p>
        <p>Pin Code:</p>
        <p>Adher Number:</p>
        <p>PAN Number:</p>
        <p>GST Number:</p>
        <p>Account Number:</p>
        <p>IFSC Number:</p>
        <p>Branch Name:</p>
        <p>Account Holder Name:</p>
        <p>Bank Name:</p>
      </div>
      <div className="text-left text-gray-700">
        <p>{farmer.name}</p>
        <p>{farmer.fatherName}</p>
        <p>{farmer.mobile}</p>
        <p>{farmer.email}</p>
        <p>{farmer.state}</p>
        <p>{farmer.district}</p>
        <p>{farmer.policeStation}</p>
        <p>{farmer.village}</p>
        <p>{farmer.pinCode}</p>
        <p>{farmer.adherNumber}</p>
        <p>{farmer.panNumber}</p>
        <p>{farmer.gstNumber}</p>
        <p>{farmer.accountNumber}</p>
        <p>{farmer.ifscNumber}</p>
        <p>{farmer.branchName}</p>
        <p>{farmer.accountHolderName}</p>
        <p>{farmer.bankName}</p>
      </div>
    </div>
  );
};

export default FarmerInfo;
