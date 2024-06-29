import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { IoSendSharp } from "react-icons/io5";

const GodownTable = ({
  currentCollections,
  handleEdit,
  handleRateEdit,
  handleQualityEdit,
  rateEditId,
  currentGodown,
  handleRateChange,
}) => {
  const navigate = useNavigate();

  const onRateChange = useCallback(
    (event) => handleRateChange(event),
    [handleRateChange]
  );

  const handleSaleClick = (collection) => {
    navigate("/bid-for-supplier", { state: { selectedGodown: collection } });
  };

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gradient-to-r from-green-400 to-yellow-500 text-white">
          <th className="px-6 py-3 border-b">Name</th>
          <th className="px-6 py-3 border-b">Location</th>
          <th className="px-6 py-3 border-b">Rate</th>
          <th className="px-6 py-3 border-b">Capacity</th>
          <th className="px-6 py-3 border-b">Quality Parameters</th>
          <th className="px-6 py-3 border-b">Sale</th>
          <th className="px-6 py-3 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentCollections.map((collection) => (
          <tr key={collection._id}>
            <td className="px-6 py-4 border-b">{collection.name}</td>
            <td className="px-6 py-4 border-b">
              {collection.location.name}, {collection.location.landmark},{" "}
              {collection.location.pin}, {collection.location.state}
            </td>
            <td className="px-6 py-4 border-b">
              {rateEditId === collection._id ? (
                <input
                  type="number"
                  value={currentGodown.rate}
                  onChange={onRateChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              ) : (
                collection.rate
              )}
            </td>
            <td className="px-6 py-4 border-b">{collection.totalCapacity}</td>
            <td className="px-6 py-4 border-b">
              {collection.quality?.map((q, index) => (
                <div key={index}>
                  <strong>{q.parameter}:</strong> Accepted - {q.accepted},
                  Upto - {q.upto}
                </div>
              ))}
            </td>
            <td className="px-6 py-4 border-b">
              <button
                onClick={() => handleSaleClick(collection)}
                className="text-red-500 hover:text-red-700"
              >
                <IoSendSharp className="inline-block mr-1" title="Sale" />
              </button>
            </td>
            <td className="px-6 py-4 border-b">
              <button
                onClick={() => handleEdit(collection)}
                className="text-blue-500 hover:text-blue-700"
              >
                <CiEdit className="inline-block mr-1" /> Edit
              </button>
              <button
                onClick={() => handleRateEdit(collection)}
                className="text-green-500 hover:text-green-700 ml-4"
              >
                Edit Rate
              </button>
              <button
                onClick={() => handleQualityEdit(collection)}
                className="text-yellow-500 hover:text-yellow-700 ml-4"
              >
                Edit Quality
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GodownTable;
