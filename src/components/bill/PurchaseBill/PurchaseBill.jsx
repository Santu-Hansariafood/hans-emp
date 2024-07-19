import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LorryDetails from "./LorryDetails";
import WeightDetails from "./WeightDetails";
import QualityDetails from "./QualityDetails";
import CostDetails from "./CostDetails";
import FarmerDetails from "./FarmerDetails";
import axios from "axios";

const PurchaseBill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mobileNumber, farmerId } = location.state || {};

  const [lorryNumber, setLorryNumber] = useState("");
  const [productName] = useState("Maize");
  const [company, setCompany] = useState("");
  const [totalBag, setTotalBag] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [tareWeight, setTareWeight] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [deltaWeight, setDeltaWeight] = useState("");
  const [paymentWeight, setPaymentWeight] = useState("");
  const [rate, setRate] = useState("");
  const [unloadingCost, setUnloadingCost] = useState(0);
  const [bagPrice, setBagPrice] = useState(0);
  const [payableAmount, setPayableAmount] = useState("");
  const [claim, setClaim] = useState(0);
  const [netAmount, setNetAmount] = useState("");
  const [totalClaim, setTotalClaim] = useState(0);
  const [netPayment, setNetPayment] = useState(0);
  const [grossPayment, setGrossPayment] = useState("");
  const [totalUnloadingCost, setTotalUnloadingCost] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [qualityParams, setQualityParams] = useState([
    {
      label: "Moisture",
      claim: "",
      basic: "",
      actual: "",
      excess: "",
      claimPercentage: "",
      claimAmount: "",
    },
    {
      label: "Broken",
      claim: "",
      basic: "",
      actual: "",
      excess: "",
      claimPercentage: "",
      claimAmount: "",
    },
    {
      label: "FM",
      claim: "",
      basic: "",
      actual: "",
      excess: "",
      claimPercentage: "",
      claimAmount: "",
    },
    {
      label: "Small Grain",
      claim: "",
      basic: "",
      actual: "",
      excess: "",
      claimPercentage: "",
      claimAmount: "",
    },
    {
      label: "Water Damage",
      claim: "",
      basic: "",
      actual: "",
      excess: "",
      claimPercentage: "",
      claimAmount: "",
    },
  ]);
  const [farmerData, setFarmerData] = useState({});

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await axios.get(
          `https://main-server-2kc5.onrender.com/api/farmers/registerFarmer-purchasebill/${farmerId}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch farmer data");
        }
        const data = await response.data;
        setFarmerData(data);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
        Swal.fire("Error", error.message, "error");
      }
    };

    if (farmerId) {
      fetchFarmerData();
    } else {
      console.error("No farmer ID provided in location state");
    }
  }, [farmerId]);

  useEffect(() => {
    const parsedPaymentWeight = Number(paymentWeight);
    const parsedRate = Number(rate);
    const parsedTotalUnloadingCost = Number(totalUnloadingCost);
    const parsedBagPrice = Number(bagPrice);
    const parsedTotalClaim = qualityParams.reduce(
      (total, param) => total + Number(param.claimAmount || 0),
      0
    );

    setTotalClaim(parsedTotalClaim);

    if (isNaN(parsedPaymentWeight) || isNaN(parsedRate)) {
      setGrossPayment(0);
    } else {
      const calculatedGrossPayment = parsedPaymentWeight * parsedRate;
      setGrossPayment(calculatedGrossPayment);

      const calculatedNetPayment = calculatedGrossPayment - parsedTotalClaim;
      setNetPayment(calculatedNetPayment);

      const calculatedTotalExpense =
        parsedTotalUnloadingCost + parsedBagPrice + parsedTotalClaim;
      setTotalExpense(calculatedTotalExpense);

      const calculatedNetAmount = calculatedNetPayment - calculatedTotalExpense;
      setNetAmount(calculatedNetAmount);

      setPayableAmount(calculatedNetAmount);
    }
  }, [qualityParams, paymentWeight, rate, totalUnloadingCost, bagPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billData = {
      lorryNumber,
      qualityParams,
      totalBag,
      grossWeight,
      tareWeight,
      netWeight,
      deltaWeight,
      paymentWeight,
      rate,
      claim,
      unloadingCost,
      bagPrice,
      payableAmount,
      netAmount,
      mobileNumber,
      farmerId,
      farmerName: farmerData.name,
      farmerAddress: `${farmerData.village}, ${farmerData.policeStation}, ${farmerData.district}, ${farmerData.state}, ${farmerData.pinCode}`,
      farmerAccountDetails: {
        accountHolderName: farmerData.accountHolderName,
        bankName: farmerData.bankName,
        branchName: farmerData.branchName,
        accountNumber: farmerData.accountNumber,
        ifscNumber: farmerData.ifscNumber,
      },
      totalUnloadingCost,
      company,
    };

    console.log("Bill Data:", billData);

    try {
      const response = await axios.post(
        "https://main-server-2kc5.onrender.com/api/bills",
        billData
      );

      if (response.status === 200) {
        Swal.fire("Success", "Bill created successfully", "success");
        navigate("/display-bill", {
          state: { billData: response.data, farmerId },
        });
      } else {
        Swal.fire("Error", "Failed to create bill", "error");
      }
    } catch (error) {
      console.error("Error creating bill:", error);
      Swal.fire("Error", "Failed to create bill", "error");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Bill</h1>
      <form onSubmit={handleSubmit}>
        <LorryDetails
          lorryNumber={lorryNumber}
          setLorryNumber={setLorryNumber}
          productName={productName}
          company={company}
          setCompany={setCompany}
        />
        <WeightDetails
          totalBag={totalBag}
          setTotalBag={setTotalBag}
          grossWeight={grossWeight}
          setGrossWeight={setGrossWeight}
          tareWeight={tareWeight}
          setTareWeight={setTareWeight}
          netWeight={netWeight}
          setNetWeight={setNetWeight}
          deltaWeight={deltaWeight}
          setDeltaWeight={setDeltaWeight}
          paymentWeight={paymentWeight}
          setPaymentWeight={setPaymentWeight}
          rate={rate}
          setRate={setRate}
          grossPayment={grossPayment}
          setGrossPayment={setGrossPayment}
          totalClaim={totalClaim}
          setTotalClaim={setTotalClaim}
          netPayment={netPayment}
          setNetPayment={setNetPayment}
        />
        <QualityDetails
          qualityParams={qualityParams}
          setQualityParams={setQualityParams}
          grossPayment={parseFloat(grossPayment)}
          setTotalClaim={setTotalClaim}
          totalClaim={totalClaim}
        />
        <CostDetails
          setTotalUnloadingCost={setTotalUnloadingCost}
          setTotalExpense={setTotalExpense}
          totalExpense={totalExpense}
          grossPayment={grossPayment}
          totalClaimAmount={totalClaim}
        />
        <FarmerDetails farmerData={farmerData} />
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Create Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseBill;
