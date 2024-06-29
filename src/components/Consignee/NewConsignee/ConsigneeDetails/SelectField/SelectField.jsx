import React from "react";

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block mb-1 font-bold">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded p-2"
    >
      <option value="">Select State</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
