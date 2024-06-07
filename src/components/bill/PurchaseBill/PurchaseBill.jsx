import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LorryDetails from "./LorryDetails";
import WeightDetails from "./WeightDetails";
import QualityDetails from "./QualityDetails";
import CostDetails from "./CostDetails";
import FarmerDetails from "./FarmerDetails";

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
  const [claimAmount, setClaimAmount] = useState(0);
  const [netAmount, setNetAmount] = useState("");
  const [totalClaim, setTotalClaim] = useState(0);
  const [netPayment, setNetPayment] = useState(0);
  const [grossPayment, setGrossPayment] = useState("");
  const [totalClaimCost, setTotalClaimCost] = useState(0);
  const [totalUnloadingCost, setTotalUnloadingCost] = useState(0);
  const [totalExpense, setTotalExpense] = useState();
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
        const response = await fetch(
          `http://localhost:3000/registerFarmer-purchasebill/${farmerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch farmer data");
        }
        const data = await response.json();
        setFarmerData(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    if (farmerId) {
      fetchFarmerData();
    }
  }, [farmerId]);

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
      const response = await fetch("http://localhost:3000/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      if (response.ok) {
        const createdBill = await response.json();
        Swal.fire("Success", "Bill created successfully", "success");
        navigate("/display-bill", {
          state: { billData: createdBill, farmerId },
        });
      } else {
        const errorData = await response.json();
        Swal.fire(
          "Error",
          `Failed to create bill: ${errorData.message}`,
          "error"
        );
      }
    } catch (error) {
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
          grossPayment={grossPayment}
          setClaimAmount={setClaimAmount}
        />
        <CostDetails
          setTotalUnloadingCost={setTotalUnloadingCost}
          setTotalExpense={setTotalExpense}
          totalExpense={totalExpense}
          grossPayment={grossPayment}
          totalClaimAmount={claimAmount}
        />
        <FarmerDetails farmerData={farmerData} />
        <div className="mt-10">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Generate Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseBill;
