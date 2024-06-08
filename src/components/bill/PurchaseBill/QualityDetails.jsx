import React, { useEffect } from "react";

const QualityDetails = ({
  qualityParams,
  setQualityParams,
  grossPayment,
  setTotalClaim,
  totalClaim
}) => {
  const handleQualityChange = (index, field, value) => {
    const newQualityParams = [...qualityParams];

    if (field === "claim" && value.includes(":")) {
      const parts = value.split(":");
      if (parts.length === 2) {
        parts[1] = parts[1].startsWith(".") ? `0${parts[1]}` : parts[1];
        value = `${parts[0]}:${parts[1]}`;
      }
    }

    newQualityParams[index][field] = value;

    const basic = parseFloat(newQualityParams[index]["basic"]);
    const actual = parseFloat(newQualityParams[index]["actual"]);

    if (!isNaN(basic) && !isNaN(actual)) {
      newQualityParams[index]["excess"] = (actual - basic).toFixed(2);

      const claimRatio = parseFloat(
        newQualityParams[index]["claim"].split(":")[1]
      );

      newQualityParams[index]["claimPercentage"] = (
        newQualityParams[index]["excess"] * claimRatio
      ).toFixed(2);
      newQualityParams[index]["claimAmount"] = (
        (grossPayment * newQualityParams[index]["claimPercentage"]) /
        100
      ).toFixed(2);
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
            onChange={(e) =>
              handleQualityChange(index, "claim", e.target.value)
            }
            required
            className="col-span-1 p-2 border border-gray-300 rounded-md"
            pattern="\d+:(0\.\d+|\d+)"
            title="Enter ratio in format 1:0.5, 1:1.5, etc."
          />
          <input
            type="number"
            step="0.01"
            value={param.basic}
            onChange={(e) =>
              handleQualityChange(index, "basic", e.target.value)
            }
            required
            className="col-span-1 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            step="0.01"
            value={param.actual}
            onChange={(e) =>
              handleQualityChange(index, "actual", e.target.value)
            }
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
