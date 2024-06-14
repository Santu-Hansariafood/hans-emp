import React from "react";

const InputField = ({ id, label, value, onChange, placeholder, type = "text", required = false }) => (
  <div>
    <label className="block text-gray-700 mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
      required={required}
    />
  </div>
);

export default InputField;
