import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ConsigneeForm from "./ConsigneeForm/ConsigneeForm";
import Loading from "./Loading/Loading";

const NewConsignee = () => {
  const [loading, setLoading] = useState(false);
  const [consignees, setConsignees] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSubmit = async (consignees) => {
    setLoading(true);
    try {
      await axios.post("https://main-server-2kc5.onrender.com/api/consignees", consignees);
      Swal.fire({
        title: "Success!",
        text: "Consignee details saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setConsignees([]);
      setSelectedCompany(null);
    } catch (error) {
      console.error("Error saving consignees:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error saving the consignee details. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && <Loading />}
      <div className={`max-w-6xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200 ${loading ? "opacity-50" : ""}`}>
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
          Add Consignee Details
        </h1>
        <ConsigneeForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewConsignee;
