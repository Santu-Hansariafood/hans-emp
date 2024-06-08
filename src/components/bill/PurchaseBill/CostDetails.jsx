import React, { useState, useEffect } from "react";

const CostDetails = ({
  setTotalUnloadingCost,
  setTotalExpense,
  totalExpense,
  grossPayment,
  totalClaimAmount,
}) => {
  const [unloadingCost, setUnloadingCost] = useState();
  const [totalBagCost, setTotalBagCost] = useState();
  const [claimAmount, setClaimAmount] = useState(totalClaimAmount);
  const [netPayment, setNetPayment] = useState();

  useEffect(() => {
    setClaimAmount(totalClaimAmount);
  }, [totalClaimAmount]);

  useEffect(() => {
    const totalUnloading = unloadingCost + totalBagCost;
    setTotalUnloadingCost(totalUnloading.toFixed(2));
    setTotalExpense((totalUnloading + parseFloat(claimAmount)).toFixed(2));
  }, [
    unloadingCost,
    totalBagCost,
    claimAmount,
    setTotalUnloadingCost,
    setTotalExpense,
  ]);

  useEffect(() => {
    const netPay = parseFloat(grossPayment) - parseFloat(totalExpense);
    setNetPayment(netPay.toFixed(2));
  }, [grossPayment, totalExpense]);

  const handleUnloadingCostChange = (e) => {
    const cost = parseFloat(e.target.value);
    setUnloadingCost(cost);
  };

  const handleTotalBagCostChange = (e) => {
    const cost = parseFloat(e.target.value);
    setTotalBagCost(cost);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Unloading Cost:
      </label>
      <input
        type="number"
        value={unloadingCost}
        onChange={handleUnloadingCostChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Total Bag Cost:
      </label>
      <input
        type="number"
        value={totalBagCost}
        onChange={handleTotalBagCostChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Total Unloading Cost:
      </label>
      <input
        type="number"
        value={unloadingCost + totalBagCost}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Claim Amount For Quality:
      </label>
      <input
        type="number"
        value={parseFloat(claimAmount)}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Total Expense:
      </label>
      <input
        type="number"
        value={parseFloat(totalExpense)}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Net Payment:
      </label>
      <input
        type="number"
        value={parseFloat(netPayment)}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default CostDetails;
