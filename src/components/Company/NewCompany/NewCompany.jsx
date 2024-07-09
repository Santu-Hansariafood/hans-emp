import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import InputField from "./InputField/InputField";
import ButtonGroup from "./ButtonGroup/ButtonGroup";
import ConsigneeForm from "../../Consignee/NewConsignee/ConsigneeForm/ConsigneeForm";
import ConsigneeDropdown from "../../Consignee/ConsigneeDropdown/ConsigneeDropdown";

const NewCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [emails, setEmails] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [showConsigneeForm, setShowConsigneeForm] = useState(false);
  const [selectedConsignees, setSelectedConsignees] = useState([]);
  const [isManualInput, setIsManualInput] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isPhoneValid = phoneNumbers.every((num) => num.length === 10);
    if (!isPhoneValid) {
      Swal.fire({
        title: "Error!",
        text: "Each phone number must be 10 digits long",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/companies",
        {
          companyName,
          location,
          billingAddress,
          gstNo,
          panNo,
          phoneNumbers,
          emails,
          consignees: selectedConsignees.map((consignee) => consignee.value),
        }
      );

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
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem submitting the form",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePhoneChange = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleManualConsigneeSubmit = (newConsignee) => {
    setSelectedConsignees([...selectedConsignees, { value: newConsignee.id, label: newConsignee.name }]);
    setShowConsigneeForm(false);
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
      <div className="w-3/4 mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200 max-w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
          New Company
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              id="companyName"
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter Company Name"
            />
            {phoneNumbers.map((phone, index) => (
              <InputField
                key={index}
                id={`phone-${index}`}
                label={`Phone Number ${index + 1}`}
                value={phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                placeholder="Enter Phone Number"
                maxLength={10}
              />
            ))}
            <button
              type="button"
              className="text-blue-500 underline col-span-1 md:col-span-2 lg:col-span-3"
              onClick={addPhoneNumber}
            >
              Add More Phone Number
            </button>
            {emails.map((email, index) => (
              <InputField
                key={index}
                id={`email-${index}`}
                label={`Email ${index + 1}`}
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="Enter Email"
              />
            ))}
            <button
              type="button"
              className="text-blue-500 underline col-span-1 md:col-span-2 lg:col-span-3"
              onClick={addEmail}
            >
              Add More Email
            </button>
            <InputField
              id="location"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location"
            />
            <InputField
              id="billingAddress"
              label="Billing Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              placeholder="Enter Billing Address"
            />
            <InputField
              id="gstNo"
              label="GST No."
              value={gstNo}
              onChange={(e) => setGstNo(e.target.value)}
              placeholder="Enter GST No."
            />
            <InputField
              id="panNo"
              label="PAN No."
              value={panNo}
              onChange={(e) => setPanNo(e.target.value)}
              placeholder="Enter PAN No."
            />
          </div>
          <ConsigneeDropdown
            selectedConsignees={selectedConsignees}
            setSelectedConsignees={setSelectedConsignees}
            setIsManualInput={setIsManualInput}
          />
          <ButtonGroup handleBack={handleBack} handleSubmit={handleSubmit} />
          {isManualInput && (
            <button
              type="button"
              className="mt-4 text-blue-500 underline"
              onClick={() => setShowConsigneeForm(!showConsigneeForm)}
            >
              {showConsigneeForm ? "Hide Consignee Form" : "Add Consignee"}
            </button>
          )}
          {showConsigneeForm && (
            <ConsigneeForm handleSubmit={handleManualConsigneeSubmit} />
          )}
        </form>
      </div>
    </div>
  );
};

export default NewCompany;
