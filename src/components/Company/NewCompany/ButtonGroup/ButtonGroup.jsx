import React from "react";

const ButtonGroup = ({ handleBack, handleSubmit }) => {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handleBack}
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default ButtonGroup;
