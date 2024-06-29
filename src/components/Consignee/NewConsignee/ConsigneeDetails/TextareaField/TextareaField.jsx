import React from "react";

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block mb-1 font-bold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded p-2"
      placeholder={placeholder}
    />
  </div>
);

export default TextareaField;
