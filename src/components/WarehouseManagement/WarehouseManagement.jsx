import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const WarehouseManagement = () => {
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [farmerOptions, setFarmerOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [location, setLocation] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [loads, setLoads] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [pendingCapacity, setPendingCapacity] = useState(0);
  const [qualityParameters, setQualityParameters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get("https://main-server-2kc5.onrender.com/api/godowns");
        const warehouses = response.data.map(godown => ({
          value: godown._id,
          label: godown.name,
          location: godown.location,
          totalCapacity: godown.totalCapacity,
          quality: godown.quality,
        }));
        setWarehouseOptions(warehouses);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    const fetchFarmerData = async () => {
      try {
        const response = await axios.get("https://main-server-2kc5.onrender.com/api/farmers/getAllFarmers");
        const farmers = response.data.farmers.map(farmer => ({
          value: farmer._id,
          label: farmer.name,
        }));
        setFarmerOptions(farmers);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    fetchWarehouseData();
    fetchFarmerData();
  }, []);

  const handleWarehouseChange = (option) => {
    setSelectedWarehouse(option);
    setLocation(`${option.location.name}, ${option.location.landmark}, ${option.location.pin}, ${option.location.state}`);
    setTotalCapacity(option.totalCapacity);
    setQualityParameters(option.quality);
    setPendingCapacity(option.totalCapacity - totalWeight);
  };

  const handleAddLoad = () => {
    setLoads([...loads, { farmer: "", product: "", weight: "", price: "", quality: "" }]);
  };

  const handleLoadChange = (index, field, value) => {
    const newLoads = [...loads];
    newLoads[index][field] = value;
    setLoads(newLoads);
    calculateTotals(newLoads);
  };

  const calculateTotals = (loads) => {
    const totalWeight = loads.reduce((sum, load) => sum + Number(load.weight || 0), 0);
    const totalPrice = loads.reduce(
      (sum, load) => sum + Number(load.price || 0) * Number(load.weight || 0),
      0
    );
    const averagePrice = totalWeight ? (totalPrice / totalWeight).toFixed(2) : 0;

    setTotalWeight(totalWeight);
    setAveragePrice(averagePrice);
    setPendingCapacity(totalCapacity - totalWeight);
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Confirm Submission",
      text: "Do you want to submit the warehouse data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle submission logic here
        console.log({
          selectedWarehouse,
          totalCapacity,
          loads,
        });
        Swal.fire("Submitted!", "Your warehouse data has been submitted.", "success");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Warehouse Management</h1>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block mb-1 font-bold">Warehouse Name</label>
          <Select
            options={warehouseOptions}
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
            placeholder="Select Warehouse"
          />
        </div>
        {selectedWarehouse && (
          <>
            <div>
              <label className="block mb-1 font-bold">Location</label>
              <input
                type="text"
                value={location}
                readOnly
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Total Capacity (in quintals)</label>
              <input
                type="number"
                value={totalCapacity}
                readOnly
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Load Details</h2>
        {loads.map((load, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-bold">Loaded By</label>
                <Select
                  options={farmerOptions}
                  value={farmerOptions.find((f) => f.value === load.farmer)}
                  onChange={(option) => handleLoadChange(index, "farmer", option.label)}
                  placeholder="Choose Farmer"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">Product</label>
                <input
                  type="text"
                  value={load.product}
                  onChange={(e) => handleLoadChange(index, "product", e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter Product"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">Weight (in quintals)</label>
                <input
                  type="number"
                  value={load.weight}
                  onChange={(e) => handleLoadChange(index, "weight", e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter Weight"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-1 font-bold">Price (per quintal)</label>
                <input
                  type="number"
                  value={load.price}
                  onChange={(e) => handleLoadChange(index, "price", e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter Price"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddLoad}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Load
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold">Total Weight (in quintals)</label>
            <input
              type="number"
              value={totalWeight}
              readOnly
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Average Price (per quintal)</label>
            <input
              type="number"
              value={averagePrice}
              readOnly
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Pending Capacity (in quintals)</label>
            <input
              type="number"
              value={pendingCapacity}
              readOnly
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default WarehouseManagement;
