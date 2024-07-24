import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Select from "react-select";
import axios from "axios";
import "react-datetime/css/react-datetime.css";

const MakeBidForBuyer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    buyer: "",
    buyerPhoneNumber: "",
    buyerLocation: "",
    buyerConsignee: "",
    requireFinance: "NO",
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

  const [buyers, setBuyers] = useState([]);
  const [consignees, setConsignees] = useState([]);
  const [filteredConsignees, setFilteredConsignees] = useState([]);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get("https://main-server-2kc5.onrender.com/api/buyers");
        const data = response.data;

        const uniqueBuyers = data.map((item) => ({
          value: item._id,
          label: item.name,
          phoneNumber: item.mobile,
          location: item.bidingLocations,
          consignees: item.consignees
        }));

        setBuyers(uniqueBuyers);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      }
    };

    fetchBuyers();
  }, []);

  const products = [
    { value: "", label: "Select Product" },
    { value: "Maize", label: "Maize" },
    { value: "Soya", label: "Soya" },
    { value: "Paddy", label: "Paddy" },
    { value: "Broken Rice", label: "Broken Rice" },
    { value: "Wheat", label: "Wheat" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === "buyer") {
      const selectedBuyer = buyers.find(buyer => buyer.value === selectedOption.value);
      setFormData({
        ...formData,
        buyer: selectedOption.label,
        buyerPhoneNumber: selectedBuyer.phoneNumber,
        buyerLocation: selectedBuyer.location,
        buyerConsignee: "",
      });
      setFilteredConsignees(selectedBuyer.consignees);
    } else {
      setFormData({ ...formData, [actionMeta.name]: selectedOption.value });
    }
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
        setFormData({ ...formData, [name]: result.value });
      }
    });
  };

  const handleSubmit = async (e) => {
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

    if (!formData.rateForBid || !formData.delivery) {
      Swal.fire({
        title: "Error",
        text: "Rate and Delivery are mandatory fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await axios.post("https://main-server-2kc5.onrender.com/api/bids", formData);
      Swal.fire({
        title: "Bid Submitted!",
        text: "Your bid has been successfully submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormData({
        buyer: "",
        buyerPhoneNumber: "",
        buyerLocation: "",
        buyerConsignee: "",
        requireFinance: "NO",
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
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error submitting your bid. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-r from-green-200 via-yellow-100 to-green-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
        Make Bid For Buyer
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-1 font-bold text-gray-700">Select Buyer</label>
            <Select
              name="buyer"
              options={buyers}
              onChange={handleSelectChange}
              className="w-full"
              placeholder="Choose Buyer..."
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Buyer's Phone Number</label>
            <input
              type="text"
              name="buyerPhoneNumber"
              value={formData.buyerPhoneNumber}
              onChange={handleChange}
              maxLength={10}
              minLength={10}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter Buyer's Phone Number..."
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Buyer's Biding Location</label>
            <input
              type="text"
              name="buyerLocation"
              value={formData.buyerLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter Buyer Location..."
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Buyer's Biding Consignee</label>
            <Select
              name="buyerConsignee"
              options={filteredConsignees.map((consignee) => ({
                value: consignee,
                label: consignee,
              }))}
              onChange={handleSelectChange}
              className="w-full"
              placeholder="Choose Consignee..."
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Require Finance</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="requireFinance"
                  value="NO"
                  checked={formData.requireFinance === "NO"}
                  onChange={handleChange}
                />
                <span>NO</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="requireFinance"
                  value="YES"
                  checked={formData.requireFinance === "YES"}
                  onChange={handleChange}
                />
                <span>YES</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Select Product</label>
            <Select
              name="product"
              options={products}
              onChange={handleSelectChange}
              className="w-full"
              placeholder="Choose Product..."
            />
          </div>
          <div className="flex space-x-6">
            <div className="w-1/2">
              <label className="block mb-1 font-bold text-gray-700">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Quantity"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-bold text-gray-700">Unit</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Unit"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Rate For Bid</label>
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
            <label className="block mb-1 font-bold text-gray-700">Payment Terms</label>
            <input
              type="text"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Payment Terms"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Delivery</label>
            <input
              type="text"
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Delivery"
            />
          </div>
          <div className="flex space-x-6">
            <div className="w-1/2">
              <label className="block mb-1 font-bold text-gray-700">Bid Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-bold text-gray-700">Start Time</label>
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onClick={() => handleTimeInput("startTime")}
                readOnly
                className="w-full border border-gray-300 rounded p-2"
                placeholder="HH:MM"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-bold text-gray-700">End Time</label>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onClick={() => handleTimeInput("endTime")}
                readOnly
                className="w-full border border-gray-300 rounded p-2"
                placeholder="HH:MM"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default MakeBidForBuyer;
