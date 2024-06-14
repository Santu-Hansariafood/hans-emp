import React from "react";

const FormSection = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    {children}
  </div>
);

export default FormSection;
