import React from "react";

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="block mb-1 font-bold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded p-2"
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
