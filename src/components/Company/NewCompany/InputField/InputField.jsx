import React from "react";

const InputField = ({ id, label, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block">
        {label} :
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>
  );
};

export default InputField;
