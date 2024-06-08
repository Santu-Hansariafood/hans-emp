// import React, { useEffect } from "react";

// const WeightDetails = ({
//   totalBag,
//   setTotalBag,
//   grossWeight,
//   setGrossWeight,
//   tareWeight,
//   setTareWeight,
//   netWeight,
//   setNetWeight,
//   deltaWeight,
//   setDeltaWeight,
//   paymentWeight,
//   setPaymentWeight,
//   rate,
//   setRate,
//   grossPayment,
//   setGrossPayment,
//   totalClaim,
//   setTotalClaim,
//   netPayment,
//   setNetPayment,
// }) => {
//   useEffect(() => {
//     if (grossWeight && tareWeight) {
//       const netW = parseFloat(grossWeight) - parseFloat(tareWeight);
//       setNetWeight(netW.toFixed(2));
//     }
//   }, [grossWeight, tareWeight, setNetWeight]);

//   useEffect(() => {
//     if (netWeight && deltaWeight) {
//       const paymentW = parseFloat(netWeight) - parseFloat(deltaWeight);
//       setPaymentWeight(paymentW.toFixed(2));
//     }
//   }, [netWeight, deltaWeight, setPaymentWeight]);

//   useEffect(() => {
//     if (paymentWeight && rate) {
//       const grossPay = parseFloat(paymentWeight) * parseFloat(rate);
//       setGrossPayment(grossPay.toFixed(2));
//     }
//   }, [paymentWeight, rate, setGrossPayment]);

//   useEffect(() => {
//     if (paymentWeight && rate && totalClaim) {
//       const netPay = parseFloat(paymentWeight) * parseFloat(rate) - parseFloat(totalClaim);
//       setNetPayment(netPay.toFixed(2));
//     }
//   }, [paymentWeight, rate, totalClaim, setNetPayment]);

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">Total Bag:</label>
//       <input
//         type="text"
//         value={totalBag}
//         onChange={(e) => setTotalBag(e.target.value)}
//         required
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-4">Gross Weight (quintals):</label>
//       <input
//         type="text"
//         value={grossWeight}
//         onChange={(e) => setGrossWeight(e.target.value)}
//         required
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-4">Tare Weight (quintals):</label>
//       <input
//         type="text"
//         value={tareWeight}
//         onChange={(e) => setTareWeight(e.target.value)}
//         required
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-4">Net Weight (quintals):</label>
//       <input
//         type="text"
//         value={netWeight}
//         readOnly
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-4">Delta Weight (quintals):</label>
//       <input
//         type="text"
//         value={deltaWeight}
//         onChange={(e) => setDeltaWeight(e.target.value)}
//         required
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-4">Payment Weight (quintals):</label>
//       <input
//         type="text"
//         value={paymentWeight}
//         readOnly
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-4">Rate (Per Quintal):</label>
//       <input
//         type="text"
//         value={rate}
//         onChange={(e) => setRate(e.target.value)}
//         required
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-4">Gross Payment:</label>
//       <input
//         type="text"
//         value={grossPayment}
//         readOnly
//         className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//       />
//     </div>
//   );
// };

// export default WeightDetails;
import React, { useEffect } from "react";

const WeightDetails = ({
  totalBag,
  setTotalBag,
  grossWeight,
  setGrossWeight,
  tareWeight,
  setTareWeight,
  netWeight,
  setNetWeight,
  deltaWeight,
  setDeltaWeight,
  paymentWeight,
  setPaymentWeight,
  rate,
  setRate,
  grossPayment,
  setGrossPayment,
  totalClaim,
  setTotalClaim,
  netPayment,
  setNetPayment,
}) => {
  useEffect(() => {
    if (grossWeight && tareWeight) {
      const netW = parseFloat(grossWeight) - parseFloat(tareWeight);
      setNetWeight(netW.toFixed(2));
    }
  }, [grossWeight, tareWeight, setNetWeight]);

  useEffect(() => {
    if (netWeight && deltaWeight) {
      const paymentW = parseFloat(netWeight) - parseFloat(deltaWeight);
      setPaymentWeight(paymentW.toFixed(2));
    }
  }, [netWeight, deltaWeight, setPaymentWeight]);

  useEffect(() => {
    if (paymentWeight && rate) {
      const grossPay = parseFloat(paymentWeight) * parseFloat(rate);
      setGrossPayment(grossPay.toFixed(2));
    }
  }, [paymentWeight, rate, setGrossPayment]);

  useEffect(() => {
    if (paymentWeight && rate && totalClaim) {
      const netPay = parseFloat(paymentWeight) * parseFloat(rate) - parseFloat(totalClaim);
      setNetPayment(netPay.toFixed(2));
    }
  }, [paymentWeight, rate, totalClaim, setNetPayment]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Total Bag:</label>
      <input
        type="text"
        value={totalBag}
        onChange={(e) => setTotalBag(e.target.value)}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Gross Weight (quintals):</label>
      <input
        type="text"
        value={grossWeight}
        onChange={(e) => setGrossWeight(e.target.value)}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Tare Weight (quintals):</label>
      <input
        type="text"
        value={tareWeight}
        onChange={(e) => setTareWeight(e.target.value)}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Net Weight (quintals):</label>
      <input
        type="text"
        value={netWeight}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Delta Weight (quintals):</label>
      <input
        type="text"
        value={deltaWeight}
        onChange={(e) => setDeltaWeight(e.target.value)}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Payment Weight (quintals):</label>
      <input
        type="text"
        value={paymentWeight}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Rate (Per Quintal):</label>
      <input
        type="text"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Gross Payment:</label>
      <input
        type="text"
        value={grossPayment}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
      />
    </div>
  );
};

export default WeightDetails;
