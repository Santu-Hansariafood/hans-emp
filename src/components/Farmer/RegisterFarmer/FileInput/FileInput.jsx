import React from "react";

const FileInput = ({ id, label, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type="file"
      id={id}
      name={id}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
);

export default FileInput;
