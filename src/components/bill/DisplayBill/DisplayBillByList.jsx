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

const DisplayBillByList = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

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

  const grossPayment = billData.paymentWeight * billData.rate;

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const companyInfo = companyData[billData.company] || {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Purchase Bill - {billData.selectedGodownName}
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
                <strong>Name:</strong> {billData.farmerName}
              </p>
              <p>
                <strong>Address:</strong> {billData.farmerAddress}
              </p>
              <p>
                <strong>Mobile Number:</strong> {billData.mobileNumber}
              </p>
              <p>
                <strong>Pan Number:</strong>{" "}
                {billData.farmerAccountDetails.panNumber}
              </p>
            </td>
            <td className="border border-gray-400 p-2">
              <p>
                <strong>Date:</strong> {billData.date}
              </p>
              <p>
                <strong>Bill No:</strong> {billData.billNumber}
              </p>
              <p>
                  <strong>Product Name:</strong> {billData.productName}
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
            <th className="border border-gray-400 p-2">Gross Payment</th>
            <th colSpan="3" className="border border-gray-400 p-2"></th>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">
              {billData.paymentWeight}
            </td>
            <td className="border border-gray-400 p-2">{billData.rate}</td>
            <td className="border border-gray-400 p-2">{grossPayment}</td>
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
            <th className="border border-gray-400 p-2">Claim</th>
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
              <td className="border border-gray-400 p-2">{param.claim}</td>
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

      <h2 className="text-center p-2 text-xl font-bold">Payment Details</h2>
      <table className="table-auto w-full mb-4 border-collapse border border-gray-400">
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">
              <strong>Net Amount:</strong>
            </td>
            <td className="border border-gray-400 p-2">{netAmount}</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">
              <strong>Net Amount in Words:</strong>
            </td>
            <td className="border border-gray-400 p-2">{netAmountInWords}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-center p-2 text-xl font-bold">Account Details</h2>
      <table className="table-auto w-full mb-4 border-collapse border border-gray-400">
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">
              <strong>Account Holder Name:</strong> <br />
              <strong>Bank Name:</strong> <br />
              <strong>Branch Name:</strong> <br />
              <strong>Account Number:</strong> <br />
              <strong>IFSC Number:</strong> <br />
            </td>
            <td className="border border-gray-400 p-2">
              {billData.farmerAccountDetails.accountHolderName}
              <br />
              {billData.farmerAccountDetails.bankName}
              <br />
              {billData.farmerAccountDetails.branchName}
              <br />
              {billData.farmerAccountDetails.accountNumber}
              <br />
              {billData.farmerAccountDetails.ifscNumber}
              <br />
            </td>
          </tr>
        </tbody>
      </table>
      <p className="bold italic text-center">
        This is the system generated Bill No need to signature
      </p>

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

export default DisplayBillByList;
