import React from "react";

const NavigationButtons = ({ handleBack, handleNext }) => {
  return (
    <div className="mt-6 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
