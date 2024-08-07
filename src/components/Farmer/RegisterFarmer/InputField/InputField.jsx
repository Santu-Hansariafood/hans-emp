import React from "react";

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
  minLength,
}) => (
  <div className="flex flex-col space-y-2">
    <label className="block text-lg font-semibold text-gray-700" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      maxLength={maxLength}
      minLength={minLength}
    />
  </div>
);

export default InputField;
