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

  const Loading = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-yellow-500">Login Please Wait...</h2>
        </div>
      </div>
    );
  };

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
    <div className="relative">
      {loading && <Loading />}
      <div
        className={`max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200 ${
          loading ? "opacity-50" : ""
        }`}
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
          Login
        </h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
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
            className={`w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
