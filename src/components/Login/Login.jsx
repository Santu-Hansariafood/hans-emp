import React, { useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField/InputField";
import PasswordInput from "./PasswordInput/PasswordInput";

const LoginForm = ({ onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const loginResponse = await axios.post(
        "https://main-server-2kc5.onrender.com/api/employees/login",
        {
          mobile: mobileNumber,
          password: password,
        }
      );

      if (loginResponse.data.success) {
        const employeeFetchPromise = axios.get(
          `https://main-server-2kc5.onrender.com/api/employees/mobile/${mobileNumber}`
        );

        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        });

        const employeeResponse = await employeeFetchPromise;
        const employeeData = employeeResponse.data[0];

        if (employeeData) {
          onLoginSuccess(employeeData);
          navigate("/employee-details", {
            state: { employee: employeeData },
          });
        } else {
          setMessage("Employee data not found.");
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileNumberChange = useCallback((e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (/^[6-9]/.test(input) && input.length <= 10) {
      setMobileNumber(input);
    } else if (input === "") {
      setMobileNumber("");
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Login
      </h2>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      {loading && <p className="text-center text-gray-500 mb-4">Loading...</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="mobileNumber"
          label="Mobile Number"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          placeholder="Enter Your Mobile Number"
          required
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
          required
        />
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
