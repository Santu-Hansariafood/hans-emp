import React, { useEffect, useState } from "react";
import axios from "axios";

const QualityDetails = ({
  qualityParams,
  setQualityParams,
  grossPayment,
  setTotalClaim,
  totalClaim,
  setSelectedGodown
}) => {
  const [godowns, setGodowns] = useState([]);
  const [localSelectedGodown, setLocalSelectedGodown] = useState("");
  const claimValues = ["1:0.25", "1:0.25", "1:0.25", "1:0.25", "1:0.25"];

  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await axios.get("https://main-server-2kc5.onrender.com/api/godowns");
        setGodowns(response.data);
      } catch (error) {
        console.error("Error fetching godowns:", error);
      }
    };

    fetchGodowns();
  }, []);

  useEffect(() => {
    if (localSelectedGodown) {
      const godown = godowns.find(g => g._id === localSelectedGodown);
      if (godown && godown.quality.length > 0) {
        const newQualityParams = qualityParams.map((param, index) => ({
          ...param,
          basic: godown.quality[index] ? godown.quality[index].accepted.replace("%", "") : "",
          claim: claimValues[index]
        }));
        setQualityParams(newQualityParams);
      }
    }
  }, [localSelectedGodown, godowns, setQualityParams]);

  const handleGodownChange = (e) => {
    setLocalSelectedGodown(e.target.value);
    setSelectedGodown(e.target.value);
  };

  const handleQualityChange = (index, field, value) => {
    const newQualityParams = [...qualityParams];
    newQualityParams[index][field] = value;

    const basic = parseFloat(newQualityParams[index]["basic"]);
    const actual = parseFloat(newQualityParams[index]["actual"]);

    if (!isNaN(basic) && !isNaN(actual)) {
      newQualityParams[index]["excess"] = (actual - basic).toFixed(2);

      const claimRatio = parseFloat(newQualityParams[index]["claim"].split(":")[1]);

      newQualityParams[index]["claimPercentage"] = (newQualityParams[index]["excess"] * claimRatio).toFixed(2);
      newQualityParams[index]["claimAmount"] = ((grossPayment * newQualityParams[index]["claimPercentage"]) / 100).toFixed(2);
    }

    setQualityParams(newQualityParams);
    calculateClaim(newQualityParams);
  };

  const calculateClaim = (params) => {
    let totalClaimAmount = 0;
    params.forEach((param) => {
      totalClaimAmount += parseFloat(param["claimAmount"]) || 0;
    });
    setTotalClaim(totalClaimAmount.toFixed(2));
  };

  useEffect(() => {
    calculateClaim(qualityParams);
  }, [qualityParams, grossPayment]);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Godown
        </label>
        <select
          value={localSelectedGodown}
          onChange={handleGodownChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Godown</option>
          {godowns.map((godown) => (
            <option key={godown._id} value={godown._id}>
              {godown.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-7 gap-4 mb-4 font-bold">
        <div className="col-span-1">Quality Parameter</div>
        <div className="col-span-1">Claim</div>
        <div className="col-span-1">Basic</div>
        <div className="col-span-1">Actual</div>
        <div className="col-span-1">Excess</div>
        <div className="col-span-1">Claim %</div>
        <div className="col-span-1">Claim Amount</div>
      </div>
      {qualityParams.map((param, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 mb-4">
          <label className="block text-sm font-medium text-gray-700 col-span-1">
            {param.label}
          </label>
          <input
            type="text"
            value={param.claim}
            readOnly
            className="col-span-1 p-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="number"
            value={param.basic}
            readOnly
            className="col-span-1 p-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="number"
            step="0.01"
            value={param.actual}
            onChange={(e) => handleQualityChange(index, "actual", e.target.value)}
            required
            className="col-span-1 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={param.excess || ""}
            readOnly
            className="col-span-1 p-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="text"
            value={param.claimPercentage || ""}
            readOnly
            className="col-span-1 p-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="text"
            value={param.claimAmount || ""}
            readOnly
            className="col-span-1 p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
      ))}
      <div className="grid grid-cols-7 gap-4 mb-4 font-bold">
        <div className="col-span-5"></div>
        <div className="col-span-1">Claim Amount For Quality</div>
        <div className="col-span-1">{totalClaim}</div>
      </div>
    </div>
  );
};

export default QualityDetails;
