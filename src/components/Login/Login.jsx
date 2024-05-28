import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://main-server-9oo9.onrender.com/employeeRegister",
        {
          mobile: mobileNumber,
          password: password,
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(async () => {
          try {
            const employeeResponse = await axios.get(
              `https://main-server-9oo9.onrender.com/employeeRegister/mobile/${mobileNumber}`
            );
            const employeeData = employeeResponse.data[0];

            if (employeeData) {
              onLoginSuccess(employeeData);
              navigate("/employee-details", {
                state: { employee: employeeData },
              });
            } else {
              setMessage("Employee data not found.");
            }
          } catch (error) {
            setMessage("Failed to fetch employee data.");
          }
        });
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleMobileNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (/^[6-9]/.test(input) && input.length <= 10) {
      setMobileNumber(input);
    } else if (input === "") {
      setMobileNumber("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Login
      </h2>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            placeholder="Enter Your Mobile Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-4 py-2 text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
