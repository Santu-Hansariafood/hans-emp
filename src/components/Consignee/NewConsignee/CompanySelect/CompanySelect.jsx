import React from "react";
import Select from "react-select";

const CompanySelect = ({ companyOptions, selectedCompany, handleCompanyChange }) => (
  <div className="mb-4">
    <label className="block mb-1 font-bold">Company Name</label>
    <Select
      options={companyOptions}
      onChange={handleCompanyChange}
      value={selectedCompany}
      isSearchable
      placeholder="Select or type to search..."
    />
  </div>
);

export default CompanySelect;
