import React from "react";

const InputField = ({ id, label, value, onChange, placeholder, maxLength }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
      {label}
    </label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default InputField;
