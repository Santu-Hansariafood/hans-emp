// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CompanySelect from "../CompanySelect/CompanySelect";
// import ConsigneeDetails from "../ConsigneeDetails/ConsigneeDetails";
// import ConsigneeActions from "../ConsigneeActions/ConsigneeActions";

// const ConsigneeForm = ({ handleSubmit }) => {
//   const [consignees, setConsignees] = useState([]);
//   const [companyOptions, setCompanyOptions] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   useEffect(() => {
//     axios
//       .get("https://main-server-2kc5.onrender.com/api/companies")
//       .then((response) => {
//         const options = response.data.map((buyer) => ({
//           value: buyer.companyName,
//           label: buyer.companyName,
//         }));
//         setCompanyOptions(options);
//       })
//       .catch((error) => {
//         console.error("Error fetching company data:", error);
//       });
//   }, []);

//   const handleCompanyChange = (selectedOption) => {
//     setSelectedCompany(selectedOption);
//     setConsignees(
//       consignees.map((consignee) => ({
//         ...consignee,
//         companyName: selectedOption.value,
//       }))
//     );
//   };

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newConsignees = [...consignees];
//     newConsignees[index][name] = value;
//     setConsignees(newConsignees);
//   };

//   const handleAddConsignee = () => {
//     setConsignees([
//       ...consignees,
//       {
//         companyName: selectedCompany?.value || "",
//         name: "",
//         mobile: "",
//         email: "",
//         address: "",
//         gstNo: "",
//         panNo: "",
//         state: "",
//         location: "",
//       },
//     ]);
//   };

//   const handleRemoveConsignee = (index) => {
//     const newConsignees = consignees.filter((_, i) => i !== index);
//     setConsignees(newConsignees);
//   };

//   return (
//     <form onSubmit={(e) => {
//       e.preventDefault();
//       handleSubmit(consignees, setConsignees, setSelectedCompany);
//     }} className="space-y-6">
//       <CompanySelect
//         companyOptions={companyOptions}
//         selectedCompany={selectedCompany}
//         handleCompanyChange={handleCompanyChange}
//       />
//       {consignees.map((consignee, index) => (
//         <ConsigneeDetails
//           key={index}
//           index={index}
//           consignee={consignee}
//           handleChange={handleChange}
//           handleRemoveConsignee={handleRemoveConsignee}
//         />
//       ))}
//       <ConsigneeActions handleAddConsignee={handleAddConsignee} />
//     </form>
//   );
// };

// export default ConsigneeForm;

import React, { useState } from "react";
import ConsigneeDetails from "../ConsigneeDetails/ConsigneeDetails";
import ConsigneeActions from "../ConsigneeActions/ConsigneeActions";

const ConsigneeForm = ({ handleSubmit }) => {
  const [consignees, setConsignees] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newConsignees = [...consignees];
    newConsignees[index][name] = value;
    setConsignees(newConsignees);
  };

  const handleAddConsignee = () => {
    setConsignees([
      ...consignees,
      {
        name: "",
        mobile: "",
        email: "",
        address: "",
        gstNo: "",
        panNo: "",
        state: "",
        location: "",
      },
    ]);
  };

  const handleRemoveConsignee = (index) => {
    const newConsignees = consignees.filter((_, i) => i !== index);
    setConsignees(newConsignees);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(consignees);
      }}
      className="space-y-6"
    >
      {consignees.map((consignee, index) => (
        <ConsigneeDetails
          key={index}
          index={index}
          consignee={consignee}
          handleChange={handleChange}
          handleRemoveConsignee={handleRemoveConsignee}
        />
      ))}
      <ConsigneeActions handleAddConsignee={handleAddConsignee} />
    </form>
  );
};

export default ConsigneeForm;
