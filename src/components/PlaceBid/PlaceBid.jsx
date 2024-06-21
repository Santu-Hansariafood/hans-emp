import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import data from "../../data/state.json";
import Swal from 'sweetalert2';


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
        fetchBuyers(state, locality);
      }
    } else {
      setLocalities([]);
      setBuyers([]);
    }
  }, [state]);

  useEffect(() => {
    if (locality) {
      fetchBuyers(state, locality);
    }
  }, [locality]);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setLocality("");
    setSelectedBuyers([]);
    filterBuyersByState(e.target.value);
  };

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
    setSelectedBuyers([]);
  };

  const fetchBuyers = (state, locality) => {
    axios
      .get(
        `http://localhost:3000/api/buyers?state=${state}&locality=${locality}`
      )
      .then((response) => {
        setBuyers(response.data);
        filterBuyersByState(state, response.data);
      })
      .catch((error) => {
        console.error("Error fetching buyers:", error);
      });
  };

  const filterBuyersByState = (selectedState, allBuyers = buyers) => {
    const filtered = allBuyers.filter((buyer) => buyer.state === selectedState);
    setFilteredBuyers(filtered);
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
      icon: 'success',
      title: 'Bid sent successfully!',
      text: `Bid sent successfully to: ${buyerNames}`,
    });
  }
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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Place Bid</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Bid Details</h2>
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
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={country}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">State</label>
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
          <label className="block text-gray-700">Locality</label>
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
        <h2 className="text-xl font-semibold">Buyers</h2>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
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
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PlaceBid;
