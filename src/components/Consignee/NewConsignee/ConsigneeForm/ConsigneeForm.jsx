import React, { useState } from "react";
import ConsigneeDetails from "../ConsigneeDetails/ConsigneeDetails";
import ConsigneeActions from "../ConsigneeActions/ConsigneeActions";
import axios from 'axios';
import Swal from 'sweetalert2';

const ConsigneeForm = ({ handleSubmit }) => {
  const [consignees, setConsignees] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newConsignees = [...consignees];
    newConsignees[index][name] = value;
    setConsignees(newConsignees);
  };

  const handleAddConsignee = () => {
    setConsignees([
      ...consignees,
      {
        name: "",
        mobile: "",
        email: "",
        address: "",
        gstNo: "",
        panNo: "",
        state: "",
        location: "",
      },
    ]);
  };

  const handleRemoveConsignee = (index) => {
    const newConsignees = consignees.filter((_, i) => i !== index);
    setConsignees(newConsignees);
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleFormSubmit = async (consignees) => {
    try {
      const response = await axios.post('https://main-server-2kc5.onrender.com/api/consignees', consignees);
      Swal.fire('Success', 'Consignees added successfully', 'success');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire('Error', error.response.data, 'error');
      } else {
        Swal.fire('Error', 'An error occurred while adding consignees', 'error');
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit(consignees);
      }}
      className="space-y-6"
    >
      {consignees.map((consignee, index) => (
        <ConsigneeDetails
          key={index}
          index={index}
          consignee={consignee}
          handleChange={handleChange}
          handleRemoveConsignee={handleRemoveConsignee}
        />
      ))}
      <ConsigneeActions handleAddConsignee={handleAddConsignee} />
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ConsigneeForm;
