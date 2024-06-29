import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";

const EmployeeRegisterForm = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const data = {
      firstname,
      lastname,
      mobile,
      email,
      role,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(
        "https://main-server-2kc5.onrender.com/api/employees/register",
        data
      );

      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: "Employee registered successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFirstname("");
        setLastname("");
        setMobile("");
        setEmail("");
        setRole("");
        setPassword("");
        setConfirmPassword("");
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "Failed to register employee",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while registering the employee",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          id="firstname"
          label="First Name"
          type="text"
          value={firstname}
          placeholder="Enter Employee First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <FormInput
          id="lastname"
          label="Last Name"
          type="text"
          value={lastname}
          placeholder="Enter Employee Last Name"
          onChange={(e) => setLastname(e.target.value)}
        />
        <FormInput
          id="mobile"
          label="Mobile"
          type="text"
          value={mobile}
          placeholder="Enter Employee Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          placeholder="Enter Employee Email ID"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormSelect
          id="role"
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={["admin", "manager", "field", "back"]}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          placeholder="Enter Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default EmployeeRegisterForm;
