import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationMap from "../LocationMap/LocationMap";

const EmployeeTravelMap = () => {
  const [employees, setEmployees] = useState([]); // Initialize as an empty array
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await axios.get("https://main-server-2kc5.onrender.com/api/employees", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "X-RapidAPI-Key": "cdbafd3690msh5b1831cfe874765p121f44jsnb5a6f103870f",
        },
      });
      console.log("Employee data:", response.data.data);
      setEmployees(response.data.data || []); // Adjust this depending on response structure
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Unable to fetch employees. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    const employee = employees.find((emp) => emp._id === employeeId);
    setSelectedEmployeeId(employeeId);
    setSelectedEmployeeName(employee ? `${employee.firstname} ${employee.lastname}` : "");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-200 via-purple-100 to-blue-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Employee Travel Map</h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-lg">Loading employees...</p>
      ) : (
        <>
          <div className="mb-6">
            <label htmlFor="employee" className="block text-lg font-medium text-gray-700 mb-2">
              Select Employee:
            </label>
            <select
              id="employee"
              value={selectedEmployeeId}
              onChange={handleEmployeeChange}
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select an Employee --</option>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstname} {employee.lastname}
                  </option>
                ))
              ) : (
                <option disabled>No employees found</option>
              )}
            </select>
          </div>

          {/* Show Map if Employee is Selected */}
          {selectedEmployeeId && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Tracking: {selectedEmployeeName}
              </h3>
              <LocationMap employeeId={selectedEmployeeId} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeTravelMap;
