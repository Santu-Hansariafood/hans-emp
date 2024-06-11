import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const WorkDetails = ({ user, userRole }) => {
  const navigate = useNavigate();

  const [registerFarmer, setRegisterFarmer] = useState(false);
  const [listOfFarmers, setListOfFarmers] = useState(false);
  const [godownList, setGodownList] = useState(false);
  const [addGodown, setAddGodown] = useState(false);
  const [bill, setBill] = useState(false);
  const [registerEmployee, setRegisterEmployee] = useState(false);
  const [billList, setBillList] = useState(false);

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
    } else if (godownList) {
      selectedTitle = "Godown List";
      nextRoute = "/godown-list";
    } else if (addGodown) {
      selectedTitle = "Add Godown";
      nextRoute = "/godown";
    } else if (bill) {
      selectedTitle = "Generate Bill";
      nextRoute = "/bill";
    } else if (registerEmployee) {
      if (userRole !== "admin") {
        Swal.fire({
          title: "Access Denied",
          text: "Only admin can register employees.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
        return;
      }
      selectedTitle = "Register Employee";
      nextRoute = "/employee-register";
    } else if (billList) {
      selectedTitle = "Bill List";
      nextRoute = "/bill-list";
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
        navigate(nextRoute, { state: { user } });
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
                if (e.target.checked) {
                  setListOfFarmers(false);
                  setGodownList(false);
                  setAddGodown(false);
                  setBill(false);
                  setRegisterEmployee(false);
                }
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
                if (e.target.checked) {
                  setRegisterFarmer(false);
                  setGodownList(false);
                  setAddGodown(false);
                  setBill(false);
                  setRegisterEmployee(false);
                }
              }}
              className="form-checkbox"
            />
            <span className="ml-2">List of Farmers</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={godownList}
              onChange={(e) => {
                setGodownList(e.target.checked);
                if (e.target.checked) {
                  setRegisterFarmer(false);
                  setListOfFarmers(false);
                  setAddGodown(false);
                  setBill(false);
                  setRegisterEmployee(false);
                }
              }}
              className="form-checkbox"
            />
            <span className="ml-2">Godown List</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={addGodown}
              onChange={(e) => {
                setAddGodown(e.target.checked);
                if (e.target.checked) {
                  setRegisterFarmer(false);
                  setListOfFarmers(false);
                  setGodownList(false);
                  setBill(false);
                  setRegisterEmployee(false);
                }
              }}
              className="form-checkbox"
            />
            <span className="ml-2">Add Godown</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={bill}
              onChange={(e) => {
                setBill(e.target.checked);
                if (e.target.checked) {
                  setRegisterFarmer(false);
                  setListOfFarmers(false);
                  setGodownList(false);
                  setAddGodown(false);
                  setRegisterEmployee(false);
                }
              }}
              className="form-checkbox"
            />
            <span className="ml-2">Generate Bill</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={billList}
              onChange={(e) => {
                setBillList(e.target.checked);
                if (e.target.checked) {
                  setRegisterFarmer(false);
                  setListOfFarmers(false);
                  setGodownList(false);
                  setAddGodown(false);
                  setBill(false);
                  setRegisterEmployee(false);
                }
              }}
              className="form-checkbox"
            />
            <span className="ml-2">Show Bill List</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={registerEmployee}
              onChange={(e) => {
                setRegisterEmployee(e.target.checked);
                if (e.target.checked) {
                  setRegisterFarmer(false);
                  setListOfFarmers(false);
                  setGodownList(false);
                  setAddGodown(false);
                  setBill(false);
                }
              }}
              className="form-checkbox"
            />
            <span className="ml-2">Register Employee</span>
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
