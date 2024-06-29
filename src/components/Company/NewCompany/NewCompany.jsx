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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://main-server-2kc5.onrender.com/api/companies", {
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
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const Loading = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Submitting Please Wait...</h2>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {loading && <Loading />}
      <div className={`max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200 ${loading ? "opacity-50" : ""}`}>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
          New Company
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
    </div>
  );
};

export default NewCompany;
