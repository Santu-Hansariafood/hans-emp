import React from "react";

const InputField = ({ id, label, value, onChange, placeholder, required }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

export default InputField;
