import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyerFormFields from "./BuyerFormFields/BuyerFormFields";
import statesData from "../../data/state.json";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NewBuyer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    isFirstLogin: "YES",
    companyName: "",
    location: "",
    gstNo: "",
    billingAddress: "",
    shippingAddress: "",
    mappedFinancer: "",
    state: "",
    city: "",
    panNo: "",
    products: "",
    bidingLocations: "",
    cityOrigins: "",
    otherCompanies: "",
  });

  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/buyerCompanies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    setStates(statesData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "state") {
      const selectedState = states.find((state) => state.name === value);
      if (selectedState) {
        setCities(selectedState.cities);
      } else {
        setCities([]);
      }
    }

    if (name === "companyName") {
      const selectedCompany = companies.find(
        (company) => company.companyName === value
      );
      if (selectedCompany) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          location: selectedCompany.location,
          gstNo: selectedCompany.gstNo,
          billingAddress: selectedCompany.billingAddress,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          location: "",
          gstNo: "",
          billingAddress: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/buyers", formData);
      Swal.fire({
        icon: 'success',
        title: 'Buyer created successfully',
        text: response.data.message,
      });
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
        isFirstLogin: "YES",
        companyName: "",
        location: "",
        gstNo: "",
        billingAddress: "",
        shippingAddress: "",
        mappedFinancer: "",
        state: "",
        city: "",
        panNo: "",
        products: "",
        bidingLocations: "",
        cityOrigins: "",
        otherCompanies: "",
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error creating buyer',
        text: error.response?.data?.message || 'An error occurred',
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Buyer</h1>
      <form onSubmit={handleSubmit}>
        <BuyerFormFields
          formData={formData}
          handleChange={handleChange}
          companies={companies}
          cities={cities}
          states={states}
        />
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBuyer;
