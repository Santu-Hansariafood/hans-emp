import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const ConsigneeDropdown = ({
  selectedConsignees,
  setSelectedConsignees,
  setIsManualInput,
}) => {
  const [consignees, setConsignees] = useState([]);

  useEffect(() => {
    axios
      .get("https://main-server-2kc5.onrender.com/api/consignees")
      .then((response) => {
        const consigneeOptions = response.data.map((consignee) => ({
          value: consignee.id,
          label: consignee.name,
        }));
        setConsignees(consigneeOptions);
      })
      .catch((error) => {
        console.error("Error fetching consignees:", error);
      });
  }, []);

  const handleConsigneeChange = (selectedOptions) => {
    const manualInputSelected = selectedOptions.some((option) => option.value === "manual");
    setSelectedConsignees(selectedOptions.filter(option => option.value !== "manual"));
    setIsManualInput(manualInputSelected);
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="consignees" className="mb-2 font-semibold">
        Consignees
      </label>
      <Select
        id="consignees"
        value={selectedConsignees}
        onChange={handleConsigneeChange}
        options={[...consignees, { value: "manual", label: "Add Manually" }]}
        isMulti
        className="p-2 border rounded"
        styles={customStyles}
      />
    </div>
  );
};

export default ConsigneeDropdown;
