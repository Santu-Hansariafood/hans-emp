import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayBill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { billData } = location.state || {};

  if (!billData) {
    return <div>No bill data available</div>;
  }

  const numberToWords = (num) => {
    const a = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const b = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const inWords = (n) => {
      if (n < 20) return a[n];
      const digit = n % 10;
      if (n < 100) return b[Math.floor(n / 10)] + (digit ? "-" + a[digit] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " hundred" +
          (n % 100 === 0 ? "" : " and " + inWords(n % 100))
        );
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          " thousand" +
          (n % 1000 !== 0 ? " " + inWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          " lakh" +
          (n % 100000 !== 0 ? " " + inWords(n % 100000) : "")
        );
      return (
        inWords(Math.floor(n / 10000000)) +
        " crore" +
        (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "")
      );
    };

    return inWords(num);
  };

  const netAmount = parseFloat(billData.netAmount).toFixed(2);
  const [integerPart, decimalPart] = netAmount.split(".");
  const netAmountInWords = `${numberToWords(
    parseInt(integerPart)
  )} rupees and ${numberToWords(parseInt(decimalPart))} paise`;

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Purchase Bill</h1>

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
            <td className="border border-gray-400 p-2">{billData.company}</td>
            <td className="border border-gray-400 p-2">
              <p>
                <strong>Name:</strong> {billData.farmerName}
              </p>
              <p>
                <strong>Address:</strong> {billData.farmerAddress}
              </p>
              <p>
                <strong>Mobile Number:</strong> {billData.mobileNumber}
              </p>
            </td>
            <td className="border border-gray-400 p-2">
              <p>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Bill No:</strong>{" "}
                {Math.floor(100000 + Math.random() * 900000)}
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
            <td className="border border-gray-400 p-2">{billData.totalBag}</td>
            <td className="border border-gray-400 p-2">
              {billData.grossWeight}
            </td>
            <td className="border border-gray-400 p-2">
              {billData.tareWeight}
            </td>
            <td className="border border-gray-400 p-2">{billData.netWeight}</td>
            <td className="border border-gray-400 p-2">
              {billData.deltaWeight}
            </td>
          </tr>
          <tr>
            <th className="border border-gray-400 p-2">Payment Weight</th>
            <th className="border border-gray-400 p-2">Rate</th>
            <th colSpan="3" className="border border-gray-400 p-2"></th>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">
              {billData.paymentWeight}
            </td>
            <td className="border border-gray-400 p-2">{billData.rate}</td>
            <td colSpan="3" className="border border-gray-400 p-2"></td>
          </tr>
        </tbody>
      </table>

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
                <strong>{param.label}</strong>
              </td>
              <td className="border border-gray-400 p-2">{param.basic}</td>
              <td className="border border-gray-400 p-2">{param.actual}</td>
              <td className="border border-gray-400 p-2">{param.excess}</td>
              <td className="border border-gray-400 p-2">
                {param.claimPercentage}
              </td>
              <td className="border border-gray-400 p-2">
                {param.claimAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Net Amount</h2>
        <p>
          {netAmount}
          <br />
          <span className="italic">({netAmountInWords} only)</span>
        </p>
      </div>
      <div className="border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Bank Details</h2>
        <p>
          <strong>Account Holder Name:</strong>{" "}
          {billData.farmerAccountDetails.accountHolderName}
        </p>
        <p>
          <strong>Bank Name:</strong> {billData.farmerAccountDetails.bankName}
        </p>
        <p>
          <strong>Branch Name:</strong>{" "}
          {billData.farmerAccountDetails.branchName}
        </p>
        <p>
          <strong>Account Number:</strong>{" "}
          {billData.farmerAccountDetails.accountNumber}
        </p>
        <p>
          <strong>IFSC Number:</strong>{" "}
          {billData.farmerAccountDetails.ifscNumber}
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default DisplayBill;
