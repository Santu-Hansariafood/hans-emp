import React from "react";

const EmployeeInfo = ({ employee }) => {
  return (
    <div className="mb-4 lg:mb-0">
      <p>
        <strong>Employee ID:</strong> {employee.employeeId}
      </p>
      <p>
        <strong>Employee Name:</strong> {employee.firstname} {employee.lastname}
      </p>
      <p>
        <strong>Employee Mobile:</strong> {employee.mobile}
      </p>
      <p>
        <strong>Employee Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Blood Group:</strong> {employee.bloodgroup}
      </p>
    </div>
  );
};

export default EmployeeInfo;
