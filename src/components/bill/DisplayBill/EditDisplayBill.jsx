import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import hfLogo from "../../../Image/Hansaria-Logo.png";
import AGLogo from "../../../Image/agririse-logo.webp";

const companyData = {
  "Hansaria Food Private Limited": {
    address: "1234 Main St, City, Country",
    logo: hfLogo,
  },
  "Agri Rise Private Limited": {
    address: "5678 Second St, City, Country",
    logo: AGLogo,
  },
  "Shambhu Trading Co.": {
    address: "5678 Second St, City, Country",
    logo: "/images/companyB-logo.png",
  },
  "Balaji Enterprise": {
    address: "5678 Second St, City, Country",
    logo: "/images/companyB-logo.png",
  },
  "Shivansh Trading Co": {
    address: "5678 Second St, City, Country",
    logo: "/images/companyB-logo.png",
  },
};

const EditDisplayBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await axios.get(
          `https://main-server-2kc5.onrender.com/api/bills/${id}`
        );
        setBillData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bill data:", error);
        setLoading(false);
      }
    };

    fetchBillData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQualityParamChange = (index, e) => {
    const { name, value } = e.target;
    setBillData((prevData) => {
      const updatedQualityParams = prevData.qualityParams.map((param, i) =>
        i === index ? { ...param, [name]: value } : param
      );
      return { ...prevData, qualityParams: updatedQualityParams };
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://main-server-2kc5.onrender.com/api/bills/${id}`,
        billData
      );
      navigate(`/display-bill-list/${id}`);
    } catch (error) {
      console.error("Error updating bill data:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!billData) {
    return <div>No bill data available</div>;
  }

  const companyInfo = companyData[billData.company] || {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Edit Purchase Bill
      </h1>

      <table className="table-auto w-full mb-4 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Company</th>
            <th className="border border-gray-400 p-2">Farmer Details</th>
            <th className="border border-gray-400 p-2">Date & Bill No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">
              <img
                src={companyInfo.logo}
                alt="Company Logo"
                className="h-16 mb-2"
              />
              <p className="font-bold">{billData.company}</p>
              <p>{companyInfo.address}</p>
            </td>
            <td className="border border-gray-400 p-2">
              <p>
                <strong>Name:</strong>{" "}
                <input
                  type="text"
                  name="farmerName"
                  value={billData.farmerName}
                  onChange={handleChange}
                  className="border p-1"
                />
              </p>
              <p>
                <strong>Address:</strong>{" "}
                <input
                  type="text"
                  name="farmerAddress"
                  value={billData.farmerAddress}
                  onChange={handleChange}
                  className="border p-1"
                />
              </p>
              <p>
                <strong>Mobile Number:</strong>{" "}
                <input
                  type="text"
                  name="mobileNumber"
                  value={billData.mobileNumber}
                  onChange={handleChange}
                  className="border p-1"
                />
              </p>
            </td>
            <td className="border border-gray-400 p-2">
              <p>
                <strong>Date:</strong> {billData.date}
              </p>
              <p>
                <strong>Bill No:</strong>{" "}
                {billData.billNumber}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-auto w-full mb-4 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Total Bags</th>
            <th className="border border-gray-400 p-2">Gross Weight</th>
            <th className="border border-gray-400 p-2">Tare Weight</th>
            <th className="border border-gray-400 p-2">Net Weight</th>
            <th className="border border-gray-400 p-2">Delta Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                name="totalBag"
                value={billData.totalBag}
                onChange={handleChange}
                className="border p-1"
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                name="grossWeight"
                value={billData.grossWeight}
                onChange={handleChange}
                className="border p-1"
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                name="tareWeight"
                value={billData.tareWeight}
                onChange={handleChange}
                className="border p-1"
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                name="netWeight"
                value={billData.netWeight}
                onChange={handleChange}
                className="border p-1"
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                name="deltaWeight"
                value={billData.deltaWeight}
                onChange={handleChange}
                className="border p-1"
              />
            </td>
          </tr>
          <tr>
            <th className="border border-gray-400 p-2">Payment Weight</th>
            <th className="border border-gray-400 p-2">Rate</th>
            <th className="border border-gray-400 p-2">Gross Payment</th>
            <th colSpan="3" className="border border-gray-400 p-2"></th>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                name="paymentWeight"
                value={billData.paymentWeight}
                onChange={handleChange}
                className="border p-1"
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                name="rate"
                value={billData.rate}
                onChange={handleChange}
                className="border p-1"
              />
            </td>
            <td className="border border-gray-400 p-2">
              {billData.paymentWeight * billData.rate}
            </td>
            <td colSpan="3" className="border border-gray-400 p-2"></td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-center p-2 text-xl font-bold">
        Quality Claim For Product
      </h2>
      <table className="table-auto w-full mb-4 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Quality Parameter</th>
            <th className="border border-gray-400 p-2">Basic</th>
            <th className="border border-gray-400 p-2">Actual</th>
            <th className="border border-gray-400 p-2">Excess</th>
            <th className="border border-gray-400 p-2">Claim Percentage</th>
            <th className="border border-gray-400 p-2">Claim Amount</th>
          </tr>
        </thead>
        <tbody>
          {billData.qualityParams.map((param, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">
                <input
                  type="text"
                  name="label"
                  value={param.label}
                  onChange={(e) => handleQualityParamChange(index, e)}
                  className="border p-1"
                />
              </td>
              <td className="border border-gray-400 p-2">
                <input
                  type="number"
                  name="basic"
                  value={param.basic}
                  onChange={(e) => handleQualityParamChange(index, e)}
                  className="border p-1"
                />
              </td>
              <td className="border border-gray-400 p-2">
                <input
                  type="number"
                  name="actual"
                  value={param.actual}
                  onChange={(e) => handleQualityParamChange(index, e)}
                  className="border p-1"
                />
              </td>
              <td className="border border-gray-400 p-2">
                <input
                  type="number"
                  name="excess"
                  value={param.excess}
                  onChange={(e) => handleQualityParamChange(index, e)}
                  className="border p-1"
                />
              </td>
              <td className="border border-gray-400 p-2">
                <input
                  type="number"
                  name="claimPercentage"
                  value={param.claimPercentage}
                  onChange={(e) => handleQualityParamChange(index, e)}
                  className="border p-1"
                />
              </td>
              <td className="border border-gray-400 p-2">
                <input
                  type="number"
                  name="claimAmount"
                  value={param.claimAmount}
                  onChange={(e) => handleQualityParamChange(index, e)}
                  className="border p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Net Amount</h2>
        <p>
          {billData.netAmount}
          <br />
          <span className="italic">({billData.netAmountInWords} only)</span>
        </p>
      </div>
      <div className="border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Bank Details</h2>
        <p>
          <strong>Account Holder Name:</strong>{" "}
          <input
            type="text"
            name="accountHolderName"
            value={billData.farmerAccountDetails.accountHolderName}
            onChange={handleChange}
            className="border p-1"
          />
        </p>
        <p>
          <strong>Bank Name:</strong>{" "}
          <input
            type="text"
            name="bankName"
            value={billData.farmerAccountDetails.bankName}
            onChange={handleChange}
            className="border p-1"
          />
        </p>
        <p>
          <strong>Branch Name:</strong>{" "}
          <input
            type="text"
            name="branchName"
            value={billData.farmerAccountDetails.branchName}
            onChange={handleChange}
            className="border p-1"
          />
        </p>
        <p>
          <strong>Account Number:</strong>{" "}
          <input
            type="text"
            name="accountNumber"
            value={billData.farmerAccountDetails.accountNumber}
            onChange={handleChange}
            className="border p-1"
          />
        </p>
        <p>
          <strong>IFSC Number:</strong>{" "}
          <input
            type="text"
            name="ifscNumber"
            value={billData.farmerAccountDetails.ifscNumber}
            onChange={handleChange}
            className="border p-1"
          />
        </p>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditDisplayBill;
