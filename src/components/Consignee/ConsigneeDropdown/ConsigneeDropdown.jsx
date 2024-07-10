import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const ConsigneeDropdown = ({ selectedConsignees, setSelectedConsignees, setShowConsigneeForm, setIsManualInput }) => {
  const [consignees, setConsignees] = useState([]);
  const [showOthersField, setShowOthersField] = useState(false);
//   const [othersFieldValue, setOthersFieldValue] = useState('');

  useEffect(() => {
    axios.get('https://main-server-2kc5.onrender.com/api/consignees')
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
    const othersSelected = selectedOptions.some(option => option.value === 'others');
    setShowOthersField(othersSelected);
    setShowConsigneeForm(othersSelected);
    setIsManualInput(othersSelected);
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
      {/* {showOthersField && (
        <div>
          <input
            type="text"
            value={othersFieldValue}
            onChange={(e) => setOthersFieldValue(e.target.value)}
            placeholder="Enter other consignee"
          />
        </div>
      )} */}
    </div>
  );
};

export default ConsigneeDropdown;
