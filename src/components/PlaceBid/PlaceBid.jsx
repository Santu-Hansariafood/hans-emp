import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import data from "../../data/state.json";
import Swal from "sweetalert2";

const PlaceBid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bid } = location.state || {};

  const [country] = useState("India");
  const [state, setState] = useState("");
  const [locality, setLocality] = useState("");
  const [localities, setLocalities] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [filteredBuyers, setFilteredBuyers] = useState([]);
  const [selectedBuyers, setSelectedBuyers] = useState([]);

  useEffect(() => {
    if (!bid) {
      navigate("/");
    }
  }, [bid, navigate]);

  useEffect(() => {
    if (state) {
      const selectedState = data.find((item) => item.name === state);
      if (selectedState) {
        setLocalities(selectedState.cities);
      }
    } else {
      setLocalities([]);
    }
    fetchBuyers(state, locality);
  }, [state]);

  useEffect(() => {
    fetchBuyers(state, locality);
  }, [locality]);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setLocality("");
    setSelectedBuyers([]);
  };

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
    setSelectedBuyers([]);
  };

  const fetchBuyers = (state, locality) => {
    axios
      .get(
        `https://main-server-2kc5.onrender.com/api/buyers?state=${state}&locality=${locality}`
      )
      .then((response) => {
        setBuyers(response.data);
        filterBuyers(response.data, state);
      })
      .catch((error) => {
        console.error("Error fetching buyers:", error);
      });
  };

  const filterBuyers = (buyers, state) => {
    if (state) {
      const filtered = buyers.filter((buyer) => buyer.state === state);
      setFilteredBuyers(filtered);
    } else {
      setFilteredBuyers(buyers);
    }
  };

  const handleSelectBuyer = (buyer) => {
    setSelectedBuyers((prevSelected) => {
      if (prevSelected.includes(buyer)) {
        return prevSelected.filter((b) => b !== buyer);
      } else {
        return [...prevSelected, buyer];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedBuyers.length === filteredBuyers.length) {
      setSelectedBuyers([]);
    } else {
      setSelectedBuyers(filteredBuyers);
    }
  };

  const handleSend = () => {
    const buyerNames = selectedBuyers.map((buyer) => buyer.name).join(", ");
    Swal.fire({
      icon: "success",
      title: "Bid sent successfully!",
      text: `Bid sent successfully to: ${buyerNames}`,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Country:", country);
    console.log("State:", state);
    console.log("Locality:", locality);
    // Perform the required API call or other actions
  };

  if (!bid) {
    return null;
  }

  return (
    <div className="relative">
      <div
        className={`max-w-3xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200`}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">Place Bid</h1>
        <div className="mb-4">
          <h2 className="text-xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">Bid Details</h2>
          <table className="table-auto w-full text-left">
            <tbody>
              <tr>
                <th className="border px-4 py-2">Godown</th>
                <td className="border px-4 py-2">{bid.godown.name}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Quantity</th>
                <td className="border px-4 py-2">{bid.quantity}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Unit</th>
                <td className="border px-4 py-2">{bid.unit}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Rate</th>
                <td className="border px-4 py-2">{bid.rateForBid}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <td className="border px-4 py-2">
                  {new Date(bid.date).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Start Time</th>
                <td className="border px-4 py-2">{bid.startTime}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">End Time</th>
                <td className="border px-4 py-2">{bid.endTime}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Payment Terms</th>
                <td className="border px-4 py-2">{bid.paymentTerms}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Delivery</th>
                <td className="border px-4 py-2">{bid.delivery}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">Select Buyer By State</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Country</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={country}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">State</label>
            <select
              className="w-full px-4 py-2 border rounded-md"
              value={state}
              onChange={handleStateChange}
              required
            >
              <option value="">Select State</option>
              {data.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Locality</label>
            <select
              className="w-full px-4 py-2 border rounded-md"
              value={locality}
              onChange={handleLocalityChange}
              required
            >
              <option value="">Select Locality</option>
              {localities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="mt-6">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">Buyers</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-green-400 to-yellow-500 text-white">
                  <th className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedBuyers.length === filteredBuyers.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Mobile</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">State</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuyers.map((buyer, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedBuyers.includes(buyer)}
                        onChange={() => handleSelectBuyer(buyer)}
                      />
                    </td>
                    <td className="border px-4 py-2">{buyer.name}</td>
                    <td className="border px-4 py-2">{buyer.mobile}</td>
                    <td className="border px-4 py-2">{buyer.email}</td>
                    <td className="border px-4 py-2">{buyer.companyName}</td>
                    <td className="border px-4 py-2">{buyer.state}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={() => handleSelectBuyer(buyer)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceBid;
