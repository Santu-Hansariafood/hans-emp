import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EmployeeRegister = () => {
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
        "https://main-server-9oo9.onrender.com/empRegister",
        data
      );

      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: "Employee registered successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Reset form
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
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Employee Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              placeholder="Enter Employee First Name"
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              placeholder="Enter Employee Last Name"
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="mobile">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              placeholder="Enter Employee Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Employee Email ID"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Field">Field Stuff</option>
              <option value="Back">Back Office</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label
              className="block text -gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Enter Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
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
    </div>
  );
};

export default EmployeeRegister;
