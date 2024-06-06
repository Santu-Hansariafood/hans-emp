import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logobill from "../../../Image/Hansaria-Logo.png"
import QRCode from 'qrcode.react';

const DisplayBill = () => {
  const location = useLocation();
  const { billData } = location.state || {};
  const navigate = useNavigate();

  const [billDetails, setBillDetails] = useState(null);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bill/${billData._id}`);
        const data = await response.json();
        setBillDetails(data);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch bill details', 'error');
      }
    };

    if (billData && billData._id) {
      fetchBillDetails();
    }
  }, [billData]);

  if (!billDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between mb-4">
        <img src={Logobill} alt="Company Logo" className="h-12" />
        <div className="text-center flex-grow">
          <h1 className="text-5xl font-bold">Hansaria Food Private Limited</h1>
          <p>_______________________________Broker and Commission Agent</p>
        </div>
      </header>
      
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <strong>Bill Number:</strong> {billDetails.orderId}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center"></td>
            <td className="border border-gray-300 px-4 py-2 text-right">
              <strong>Date:</strong> {new Date(billDetails.date).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2" colSpan="2">
              <strong>Farmer Name:</strong> {billDetails.farmerName}
              <br />
              <strong>Farmer Address:</strong> {billDetails.farmerAddress}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-right">
              <strong>Mobile Number:</strong> {billDetails.mobileNumber}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center" colSpan="3">
              <strong>Vehicle Number:</strong> {billDetails.lorryNumber}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <strong>Product Name:</strong> Maize
            </td>
            <td className="border border-gray-300 px-4 py-2"></td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <strong>Quality Parameters:</strong>
              <ul>
                <li>Moisture: {billDetails.qualityParams[0]}</li>
                <li>Broken: {billDetails.qualityParams[1]}</li>
                <li>FM: {billDetails.qualityParams[2]}</li>
                <li>Small Grain: {billDetails.qualityParams[3]}</li>
                <li>Water Damage: {billDetails.qualityParams[4]}</li>
              </ul>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <strong>Loading Weight:</strong> {billDetails.loading}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <strong>Total Bag:</strong> {billDetails.totalBag}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <strong>Claim:</strong> {billDetails.claim}
            </td>
            <td className="border border-gray-300 px-4 py-2"></td>
            <td className="border border-gray-300 px-4 py-2">
              <strong>Unloading Cost:</strong> {billDetails.unloadingCost}
              <br />
              <strong>Bag Price:</strong> {billDetails.bagPrice}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between items-start">
        <div>
          <strong>Farmer Account Details:</strong>
          <div className="ml-4">
            <div>
              <strong>Account Holder Name:</strong> {billDetails.farmerAccountDetails.accountHolderName}
            </div>
            <div>
              <strong>Bank Name:</strong> {billDetails.farmerAccountDetails.bankName}
            </div>
            <div>
              <strong>Branch Name:</strong> {billDetails.farmerAccountDetails.branchName}
            </div>
            <div>
              <strong>Account Number:</strong> {billDetails.farmerAccountDetails.accountNumber}
            </div>
            <div>
              <strong>IFSC Number:</strong> {billDetails.farmerAccountDetails.ifscNumber}
            </div>
          </div>
        </div>
        <div>
          <QRCode value={JSON.stringify(billDetails)} />
        </div>
      </div>
      <div className='pt-5'>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Back
      </button>
      </div>
    </div>
  );
};

export default DisplayBill;
