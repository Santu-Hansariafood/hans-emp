import React from "react";

const FormInput = ({ id, label, type, value, placeholder, onChange }) => {
  return (
    <div>
      <label className="block text-gray-700 mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />
    </div>
  );
};

export default FormInput;
