import React from "react";
import InputField from "../InputField/InputField";
import TextareaField from "../TextareaField/TextareaField";
import SelectField from "../SelectField/SelectField";
import states from "../../../../../data/state.json";

const ConsigneeFormSection = ({ index, consignee, handleChange, handleRemoveConsignee }) => (
  <div className="space-y-6 border-t pt-4">
    <h2 className="text-lg font-bold mb-2">Consignee {index + 1}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InputField
        label="Consignee Name"
        type="text"
        name="name"
        value={consignee.name}
        onChange={(e) => handleChange(index, e)}
        placeholder="Name"
      />
      <InputField
        label="Mobile"
        type="text"
        name="mobile"
        value={consignee.mobile}
        onChange={(e) => handleChange(index, e)}
        placeholder="Mobile"
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={consignee.email}
        onChange={(e) => handleChange(index, e)}
        placeholder="Email"
      />
      <InputField
        label="GST No."
        type="text"
        name="gstNo"
        value={consignee.gstNo}
        onChange={(e) => handleChange(index, e)}
        placeholder="Enter GST No."
      />
      <InputField
        label="PAN No."
        type="text"
        name="panNo"
        value={consignee.panNo}
        onChange={(e) => handleChange(index, e)}
        placeholder="Enter PAN No."
      />
      <TextareaField
        label="Address"
        name="address"
        value={consignee.address}
        onChange={(e) => handleChange(index, e)}
        placeholder="Enter Address"
      />
      <SelectField
        label="Select State"
        name="state"
        value={consignee.state}
        onChange={(e) => handleChange(index, e)}
        options={states}
      />
      <InputField
        label="Location"
        type="text"
        name="location"
        value={consignee.location}
        onChange={(e) => handleChange(index, e)}
        placeholder="Enter Location"
      />
    </div>
    {index > 0 && (
      <button
        type="button"
        onClick={() => handleRemoveConsignee(index)}
        className="text-red-500"
      >
        Remove Consignee
      </button>
    )}
  </div>
);

export default ConsigneeFormSection;
