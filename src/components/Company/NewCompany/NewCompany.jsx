import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import InputField from "./InputField/InputField";
import ButtonGroup from "./ButtonGroup/ButtonGroup";

const NewCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [gstNo, setGstNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/companies", {
        companyName,
        location,
        billingAddress,
        gstNo,
      });
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Form has been submitted successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/company-list");
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem submitting the form",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Buyer Company Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="companyName"
          label="Company Name"
          value={companyName}
          onChange={setCompanyName}
          placeholder="Enter Company Name"
        />
        <InputField
          id="location"
          label="Location"
          value={location}
          onChange={setLocation}
          placeholder="Enter Location"
        />
        <InputField
          id="billingAddress"
          label="Billing Address"
          value={billingAddress}
          onChange={setBillingAddress}
          placeholder="Enter Billing Address"
        />
        <InputField
          id="gstNo"
          label="GST No."
          value={gstNo}
          onChange={setGstNo}
          placeholder="Enter GST No."
        />
        <ButtonGroup handleBack={handleBack} handleSubmit={handleSubmit} />
      </form>
    </div>
  );
};

export default NewCompany;
