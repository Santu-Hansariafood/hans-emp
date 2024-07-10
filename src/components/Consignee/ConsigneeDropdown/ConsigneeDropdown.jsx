// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Select from "react-select";

// const ConsigneeDropdown = ({
//   selectedConsignees,
//   setSelectedConsignees,
//   setIsManualInput,
// }) => {
//   const [consignees, setConsignees] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/consignees")
//       .then((response) => {
//         const consigneeOptions = response.data.map((consignee) => ({
//           value: consignee.id,
//           label: consignee.name,
//         }));
//         setConsignees(consigneeOptions);
//       })
//       .catch((error) => {
//         console.error("Error fetching consignees:", error);
//       });
//   }, []);

//   const handleConsigneeChange = (selectedOptions) => {
//     const manualInputSelected = selectedOptions.some(
//       (option) => option.value === "manual"
//     );

//     if (manualInputSelected) {
//       setIsManualInput(true);
//     }

//     const filteredOptions = selectedOptions.filter(
//       (option) => option.value !== "manual"
//     );

//     setSelectedConsignees(filteredOptions);
//   };

//   const customStyles = {
//     menu: (provided) => ({
//       ...provided,
//       zIndex: 9999,
//     }),
//   };

//   const removeConsignee = (consigneeToRemove) => {
//     const updatedConsignees = selectedConsignees.filter(
//       (consignee) => consignee.value !== consigneeToRemove.value
//     );
//     setSelectedConsignees(updatedConsignees);
//   };

//   return (
//     <div className="flex flex-col mb-4">
//       <label htmlFor="consignees" className="mb-2 font-semibold">
//         Consignees
//       </label>
//       <Select
//         id="consignees"
//         value={selectedConsignees}
//         onChange={handleConsigneeChange}
//         options={[...consignees, { value: "manual", label: "Add Manually" }]}
//         isMulti
//         className="p-2 border rounded"
//         styles={customStyles}
//       />
//       <div className="mt-4">
//         {selectedConsignees.map((consignee) => (
//           <div
//             key={consignee.value}
//             className="p-2 mt-2 border rounded bg-gray-100 flex justify-between items-center"
//           >
//             {consignee.label}
//             <button
//               type="button"
//               className="text-red-500 ml-4"
//               onClick={() => removeConsignee(consignee)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConsigneeDropdown;
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const ConsigneeDropdown = () => {
  const [consignees, setConsignees] = useState([]);
  const [selectedConsignees, setSelectedConsignees] = useState([]);
  const [showOthersField, setShowOthersField] = useState(false);
  const [othersFieldValue, setOthersFieldValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/consignees')
      .then(response => {
        const options = response.data.map(consignee => ({
          value: consignee._id,
          label: consignee.name
        }));
        setConsignees(options);
      })
      .catch(error => {
        console.error('There was an error fetching the consignees!', error);
      });
  }, []);

  const handleSelectChange = (selectedOptions) => {
    setSelectedConsignees(selectedOptions);
    setShowOthersField(selectedOptions.some(option => option.value === 'others'));
  };

  return (
    <div>
      <Select
        options={[...consignees, { value: 'others', label: 'Others' }]}
        isMulti
        onChange={handleSelectChange}
        value={selectedConsignees}
        placeholder="Select consignees..."
      />
      {showOthersField && (
        <div>
          <input
            type="text"
            value={othersFieldValue}
            onChange={(e) => setOthersFieldValue(e.target.value)}
            placeholder="Enter other consignee"
          />
        </div>
      )}
    </div>
  );
};

export default ConsigneeDropdown;
