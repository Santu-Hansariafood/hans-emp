import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import states from "../../../data/state.json";

const NewConsignee = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    mobile: "",
    email: "",
    address: "",
    gstNo: "",
    panNo: "",
    state: "",
    location: "",
  });
  const [consignees, setConsignees] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/buyers")
      .then((response) => {
        const options = response.data.map((buyer) => ({
          value: buyer.companyName,
          label: buyer.companyName,
        }));
        setCompanyOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newConsignees = [...consignees];
    newConsignees[index][name] = value;
    setConsignees(newConsignees);
  };

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
    setConsignees(
      consignees.map((consignee) => ({
        ...consignee,
        companyName: selectedOption.value,
      }))
    );
  };

  const handleAddConsignee = () => {
    setConsignees([
      ...consignees,
      { ...formData, companyName: selectedCompany?.value || "" },
    ]);
  };

  const handleRemoveConsignee = (index) => {
    const newConsignees = consignees.filter((_, i) => i !== index);
    setConsignees(newConsignees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/consignees", consignees);
      Swal.fire({
        title: "Success!",
        text: "Consignee details saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setConsignees([
        { ...formData, companyName: selectedCompany?.value || "" },
      ]);
    } catch (error) {
      console.error("Error saving consignees:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error saving the consignee details. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl text-center font-bold mb-6">
        Add Consignee Details
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block mb-1 font-bold">Company Name</label>
          <Select
            options={companyOptions}
            onChange={handleCompanyChange}
            value={selectedCompany}
            isSearchable
            placeholder="Select or type to search..."
          />
        </div>
        {consignees.map((consignee, index) => (
          <div key={index} className="space-y-6 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">Consignee {index + 1}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1 font-bold">Consignee Name</label>
                <input
                  type="text"
                  name="name"
                  value={consignee.name}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={consignee.mobile}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Mobile"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={consignee.email}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">GST No.</label>
                <input
                  type="text"
                  name="gstNo"
                  value={consignee.gstNo}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter GST No."
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">PAN No.</label>
                <input
                  type="text"
                  name="panNo"
                  value={consignee.panNo}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter PAN No."
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">Address</label>
                <textarea
                  name="address"
                  value={consignee.address}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter Address"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">Select State</label>
                <select
                  name="state"
                  value={consignee.state}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-bold">Location</label>
                <input
                  type="text"
                  name="location"
                  value={consignee.location}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter Location"
                />
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveConsignee(index)}
                className="text-red-500"
              >
                Remove Consignee
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddConsignee}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add More Consignee
        </button>
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewConsignee;
