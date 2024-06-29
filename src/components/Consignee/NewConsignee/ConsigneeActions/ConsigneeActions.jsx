import React from "react";

const ConsigneeActions = ({ handleAddConsignee }) => (
  <div className="flex space-x-4 mt-6">
    <button
      type="button"
      onClick={handleAddConsignee}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Add More Consignee
    </button>
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Save
    </button>
    <button
      type="button"
      onClick={() => window.history.back()}
      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
    >
      Back
    </button>
  </div>
);

export default ConsigneeActions;
