import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Select from "react-select";
import "react-datetime/css/react-datetime.css";

const BidForSupplier = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplier: "",
    company: "",
    origin: "",
    product: "",
    quantity: "",
    unit: "",
    rateForBid: "",
    date: moment().format("YYYY-MM-DD"),
    startTime: "",
    endTime: "",
    paymentTerms: "",
    delivery: "",
  });

  const suppliers = [
    { value: "Supplier1", label: "Supplier1" },
    { value: "Supplier2", label: "Supplier2" },
    { value: "Supplier3", label: "Supplier3" },
  ];

  const companies = [
    { value: "Company1", label: "Company1" },
    { value: "Company2", label: "Company2" },
    { value: "Company3", label: "Company3" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({ ...formData, [actionMeta.name]: selectedOption.value });
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
        <input type="time" id="swal-input-time" class="swal2-input" step="60">
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
      title: "Bid Submitted!",
      text: "Your bid has been successfully submitted.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Make Bid For Supplier</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate(-1)}
      >
        Back To Bid Master
      </button>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-bold">Select Supplier</label>
            <Select
              name="supplier"
              options={suppliers}
              onChange={handleSelectChange}
              className="w-full"
              placeholder="Choose Supplier..."
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Company</label>
            <Select
              name="company"
              options={companies}
              onChange={handleSelectChange}
              className="w-full"
              placeholder="Choose Company..."
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Select Origin</label>
            <select
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Choose Origin...</option>
              {/* Add options dynamically */}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold">Select Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Choose Product...</option>
              {/* Add options dynamically */}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold">Quantity</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Quantity"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Unit"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Rate For Bid (Rs.)</label>
            <input
              type="text"
              name="rateForBid"
              value={formData.rateForBid}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Rate For Bid"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Date (DD-MM-YYYY)</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => handleDateChange(moment(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Start Time (HH:MM)</label>
            <button
              type="button"
              onClick={() => handleTimeInput("startTime")}
              className="w-full bg-gray-200 border border-gray-300 rounded p-2 text-left"
            >
              {formData.startTime || "Select Start Time"}
            </button>
          </div>
          <div>
            <label className="block mb-1 font-bold">End Time (HH:MM)</label>
            <button
              type="button"
              onClick={() => handleTimeInput("endTime")}
              className="w-full bg-gray-200 border border-gray-300 rounded p-2 text-left"
            >
              {formData.endTime || "Select End Time"}
            </button>
          </div>
          <div>
            <label className="block mb-1 font-bold">Payment Terms</label>
            <input
              type="text"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter Payment Terms"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Delivery</label>
            <input
              type="text"
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter days for delivery"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Make Bid
          </button>
        </div>
      </form>
    </div>
  );
};

export default BidForSupplier;
