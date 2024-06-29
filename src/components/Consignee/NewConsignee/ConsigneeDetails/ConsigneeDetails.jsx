import React from "react";
import ConsigneeFormSection from "./ConsigneeFormSection/ConsigneeFormSection";

const ConsigneeDetails = ({ index, consignee, handleChange, handleRemoveConsignee }) => (
  <ConsigneeFormSection
    index={index}
    consignee={consignee}
    handleChange={handleChange}
    handleRemoveConsignee={handleRemoveConsignee}
  />
);

export default ConsigneeDetails;
