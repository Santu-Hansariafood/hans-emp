import React from "react";
import EmployeeActions from "../EmployeeActions/EmployeeActions";

const EmployeeRow = ({ employee, handleView, handleEdit, handleDelete }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b">{employee.employeeId}</td>
      <td className="py-2 px-4 border-b">{employee.firstname}</td>
      <td className="py-2 px-4 border-b">{employee.lastname}</td>
      <td className="py-2 px-4 border-b">{employee.role}</td>
      <td className="py-2 px-4 border-b">{employee.email}</td>
      <td className="py-2 px-4 border-b">{employee.mobile}</td>
      <td className="py-2 px-4 border-b flex space-x-2">
        <EmployeeActions
          handleView={() => handleView(employee)}
          handleEdit={() => handleEdit(employee)}
          handleDelete={() => handleDelete(employee._id)}
        />
      </td>
    </tr>
  );
};

export default EmployeeRow;
