import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayBill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { billData } = location.state || {};

  if (!billData) {
    return <div>No bill data available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{billData.companyName}</h1>
        <h1 className="text-2xl font-bold">Purchase Voucher</h1>
        <div className="text-right">
          
          <p>Phone: {billData.phoneNumber}</p>
        </div>
      </div>

      {/* Table for bill details */}
      <table className="w-full mb-8">
        <tbody>
          {/* First row */}
          <tr>
            <td className="border px-4 py-2">
              <p className="font-bold">Purchased by</p>
              <p>Company: {billData.company}</p>
            </td>
            <td className="border px-4 py-2">
              <p className="font-bold">Purchased from</p>
              <p>Farmer Name: {billData.farmerName}</p>
              <p>Address: {billData.farmerAddress}</p>
            </td>
            <td className="border px-4 py-2">
              <p className="font-bold">Purchased details</p>
              <p>Date: {billData.date}</p>
              <p>Lorry Number: {billData.lorryNumber}</p>
              <p>Challan Number: {billData.orderId}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Product details table */}
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">HSN Code</th>
            <th className="border px-4 py-2">Weight</th>
            <th className="border px-4 py-2">Rate</th>
            <th className="border px-4 py-2">Gross Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Maize</td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">{billData.weight}</td>
            <td className="border px-4 py-2">{billData.rate}</td>
            <td className="border px-4 py-2">{billData.grossAmount}</td>
          </tr>
        </tbody>
      </table>

      {/* Additional details */}
      
      <div className="mb-4">
        <h3 className="text-lg font-bold">Weight Details</h3>
        <p>Total Bags: {billData.totalBag}</p>
        <p>Gross Weight: {billData.grossWeight}</p>
        <p>Tare Weight: {billData.tareWeight}</p>
        <p>Net Weight: {billData.netWeight}</p>
        <p>Delta Weight: {billData.deltaWeight}</p>
        <p>Payment Weight: {billData.paymentWeight}</p>
        <p>Rate: {billData.rate}</p>
        <p>Unloading Cost: {billData.unloadingCost}</p>
        <p>Total Unloading Cost: {billData.totalUnloadingCost}</p>
        <p>Claim Amount: {billData.claim}</p>
        <p>Net Amount: {billData.netAmount}</p>
        <p>Payable Amount: {billData.payableAmount}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Quality Parameters</h3>
        <div className="grid grid-cols-7 gap-4 mb-4 font-bold">
          <div className="col-span-1">Quality Parameter</div>
          <div className="col-span-1">Claim</div>
          <div className="col-span-1">Basic</div>
          <div className="col-span-1">Actual</div>
          <div className="col-span-1">Excess</div>
          <div className="col-span-1">Claim %</div>
          <div className="col-span-1">Claim Amount</div>
        </div>
        {billData.qualityParams.map((param, index) => (
          <div key={index} className="grid grid-cols-7 gap-4 mb-4">
            <div className="col-span-1">{param.label}</div>
            <div className="col-span-1">{param.claim}</div>
            <div className="col-span-1">{param.basic}</div>
            <div className="col-span-1">{param.actual}</div>
            <div className="col-span-1">{param.excess}</div>
            <div className="col-span-1">{param.claimPercentage}</div>
            <div className="col-span-1">{param.claimAmount}</div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Farmer Account Details</h3>
        <p>Account Holder Name: {billData.farmerAccountDetails.accountHolderName}</p>
        <p>Bank Name: {billData.farmerAccountDetails.bankName}</p>
        <p>Branch Name: {billData.farmerAccountDetails.branchName}</p>
        <p>Account Number: {billData.farmerAccountDetails.accountNumber}</p>
        <p>IFSC Number: {billData.farmerAccountDetails.ifscNumber}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
    </div>
  );
};

export default DisplayBill;
