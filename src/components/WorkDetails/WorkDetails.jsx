import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const WorkDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee } = location.state || {};

  const [registerFarmer, setRegisterFarmer] = useState(false);
  const [listOfFarmers, setListOfFarmers] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    let selectedTitle = "";
    let nextRoute = "";

    if (registerFarmer) {
      selectedTitle = "Register Farmer";
      nextRoute = "/register-farmer";
    } else if (listOfFarmers) {
      selectedTitle = "List of Farmers";
      nextRoute = "/register-farmer-lists";
    } else {
      Swal.fire({
        title: "No Selection",
        text: "Please select an option before proceeding.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: `Proceed to ${selectedTitle}?`,
      text: "You will be navigated to the next component.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(nextRoute, { state: { employee } });
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Work Details
      </h2>
      <div className="space-y-4">
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={registerFarmer}
              onChange={(e) => {
                setRegisterFarmer(e.target.checked);
                if (e.target.checked) setListOfFarmers(false);
              }}
              className="form-checkbox"
            />
            <span className="ml-2">Register Farmer</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={listOfFarmers}
              onChange={(e) => {
                setListOfFarmers(e.target.checked);
                if (e.target.checked) setRegisterFarmer(false);
              }}
              className="form-checkbox"
            />
            <span className="ml-2">List of Farmers</span>
          </label>
        </div>
      </div>
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
    </div>
  );
};

export default WorkDetails;
