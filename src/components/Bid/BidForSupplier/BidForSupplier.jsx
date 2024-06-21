import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import Select from "react-select";
import axios from "axios";
import "react-datetime/css/react-datetime.css";

const BidForSupplier = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedGodownFromState = location.state?.selectedGodown;

  const [formData, setFormData] = useState({
    godown: selectedGodownFromState ? selectedGodownFromState._id : null,
    location: selectedGodownFromState ? selectedGodownFromState.location : {},
    quantity: "",
    unit: "Quintol", 
    rateForBid: selectedGodownFromState ? selectedGodownFromState.rate : "",
    date: moment().format("YYYY-MM-DD"),
    startTime: "",
    endTime: "",
    paymentTerms: "",
    delivery: "",
  });
  const [godowns, setGodowns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/godowns")
      .then((response) => {
        setGodowns(response.data);
      })
      .catch((error) => {
        console.error("Error fetching godowns:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === "godown") {
      const selectedGodown = godowns.find(
        (g) => g._id === selectedOption.value
      );
      setFormData({
        ...formData,
        [actionMeta.name]: selectedOption.value,
        location: selectedGodown.location,
        rateForBid: selectedGodown.rate,
      });
    } else {
      setFormData({ ...formData, [actionMeta.name]: selectedOption.value });
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date.format("YYYY-MM-DD") });
  };

  const handleTimeChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeInput = (name) => {
    Swal.fire({
      title: "Select Time",
      html: `
        <input type="time" id="swal-input-time" class="swal2-input" style="position: absolute; right: 10px;" step="60">
      `,
      showCancelButton: true,
      confirmButtonText: "Set Time",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const time = Swal.getPopup().querySelector("#swal-input-time").value;
        if (!time) {
          Swal.showValidationMessage(`Please select a time`);
        }
        return time;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleTimeChange(name, result.value);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startTime = moment(formData.startTime, "HH:mm");
    const endTime = moment(formData.endTime, "HH:mm");

    if (startTime.isAfter(endTime)) {
      Swal.fire({
        title: "Error",
        text: "Start time must be less than end time.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the bid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:3000/api/bidsSupplier', formData)
          .then(response => {
            Swal.fire({
              title: "Bid Submitted!",
              text: "Your bid has been successfully submitted.",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate('/supplier-bid-master');
          })
          .catch(error => {
            console.error("Error submitting bid:", error);
            Swal.fire({
              title: "Error",
              text: "There was an issue submitting your bid. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  const selectedGodown =
    formData.godown && godowns.find((g) => g._id === formData.godown);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Make Bid For Supplier</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate("/supplier-bid-master")}
      >
        Go To Supplier Bid Master
      </button>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-bold">Select Godown</label>
            <Select
              name="godown"
              value={
                godowns.find((g) => g._id === formData.godown) && {
                  value: formData.godown,
                  label: selectedGodown?.name || "",
                }
              }
              onChange={handleSelectChange}
              options={godowns.map((godown) => ({
                value: godown._id,
                label: godown.name,
              }))}
              placeholder="Select Godown"
              className="basic-multi-select"
              classNamePrefix="select"
              isSearchable
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={`${formData.location.name}, ${formData.location.landmark}, ${formData.location.pin}, ${formData.location.state}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Godown location"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Quantity"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Quintol">Quintol</option>
              <option value="Tons">Tons</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold">Rate for Bid</label>
            <input
              type="number"
              name="rateForBid"
              value={formData.rateForBid}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Rate for Bid"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => handleDateChange(moment(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Select Date"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Start Time</label>
            <input
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              onClick={() => handleTimeInput("startTime")}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
              placeholder="Select Start Time"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">End Time</label>
            <input
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              onClick={() => handleTimeInput("endTime")}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
              placeholder="Select End Time"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Payment Terms(In Day's)</label>
            <input
              type="text"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Payment Terms"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Supply (In Day's)</label>
            <input
              type="text"
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Supply Details"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Bid
          </button>
        </div>
      </form>
    </div>
  );
};

export default BidForSupplier;
