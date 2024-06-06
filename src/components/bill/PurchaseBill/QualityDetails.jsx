import React, { useEffect } from "react";

const QualityDetails = ({
  qualityParams,
  setQualityParams,
  grossPayment,
  setClaimAmount,
}) => {
  const handleQualityChange = (index, field, value) => {
    const newQualityParams = [...qualityParams];
    newQualityParams[index][field] = value;

    const basic = parseFloat(newQualityParams[index]["basic"]);
    const actual = parseFloat(newQualityParams[index]["actual"]);

    if (!isNaN(basic) && !isNaN(actual)) {
      newQualityParams[index]["excess"] = actual - basic;
      const claimRatio = parseFloat(newQualityParams[index]["claim"].split(":")[1]);
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
    setClaimAmount(totalClaimAmount.toFixed(2));
  };

  useEffect(() => {
    calculateClaim(qualityParams);
  }, [qualityParams, grossPayment]);

  const totalClaimAmount = qualityParams
    .reduce((total, param) => {
      return total + (parseFloat(param.claimAmount) || 0);
    }, 0)
    .toFixed(2);

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
            pattern="\d+:\d+"
            title="Enter ratio in format 1:1, 1:15, etc."
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
        <div className="col-span-1">{totalClaimAmount}</div>
      </div>
    </div>
  );
};

export default QualityDetails;
