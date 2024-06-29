import React from "react";

const FileInput = ({ id, label, onChange }) => (
  <div className="flex flex-col space-y-2">
    <label className="block text-lg font-semibold text-gray-700" htmlFor={id}>
      {label}
    </label>
    <input
      type="file"
      id={id}
      name={id}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
);

export default FileInput;
