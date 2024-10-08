import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Loading from "../../common/Loading/Loading";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const FarmerVisitPerformance = () => {
  const [farmerData, setFarmerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await axios.get(
          "https://main-server-2kc5.onrender.com/api/farmer-data"
        );
        setFarmerData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
        setLoading(false);
      }
    };
    fetchFarmerData();
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          "https://main-server-2kc5.onrender.com/api/employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      const filtered = farmerData.filter(
        (farmer) => farmer.registerBy?.fullName === selectedEmployee
      );
      setFilteredData(filtered);
    }
  }, [farmerData, selectedEmployee]);

  const filterDataByTimeframe = (timeframe) => {
    const now = new Date();
    let filtered = [];
    if (timeframe === "7-days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      filtered = filteredData.filter(
        (item) => new Date(item.createdAt) >= sevenDaysAgo
      );
    } else if (timeframe === "month") {
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      filtered = filteredData.filter(
        (item) => new Date(item.createdAt) >= lastMonth
      );
    } else if (timeframe === "year") {
      const lastYear = new Date();
      lastYear.setFullYear(now.getFullYear() - 1);
      filtered = filteredData.filter(
        (item) => new Date(item.createdAt) >= lastYear
      );
    }
    return filtered;
  };

  const getChartData = (timeframe) => {
    const chartData = filterDataByTimeframe(timeframe);
    const labels = [];
    const counts = [];

    if (timeframe === "7-days") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const currentDay = new Date().getDay();
      for (let i = 0; i < 7; i++) {
        labels.push(days[(currentDay + i) % 7]);
        counts.push(
          chartData.filter(
            (item) => new Date(item.createdAt).getDay() === (currentDay + i) % 7
          ).length
        );
      }
    } else if (timeframe === "month") {
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(i.toString());
        counts.push(
          chartData.filter((item) => new Date(item.createdAt).getDate() === i)
            .length
        );
      }
    } else if (timeframe === "year") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      for (let i = 0; i < 12; i++) {
        labels.push(months[i]);
        counts.push(
          chartData.filter((item) => new Date(item.createdAt).getMonth() === i)
            .length
        );
      }
    }

    return {
      labels,
      datasets: [
        {
          label: `Farmer Visits (${timeframe})`,
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        suggestedMax: 5,
      },
      x: {
        ticks: {
          maxTicksLimit: 7,
        },
      },
    },
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto mt-5 p-4 bg-white">
      <h2 className="text-3xl font-bold mb-4 text-center">Farmer Visits</h2>
      <div className="mb-4">
        <label
          htmlFor="employeeSelect"
          className="block text-lg font-semibold mb-2"
        >
          Select Employee:
        </label>
        <select
          id="employeeSelect"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select an Employee --</option>
          {employees.map((employee) => (
            <option
              key={employee._id}
              value={`${employee.firstname} ${employee.lastname}`}
            >
              {employee.firstname} {employee.lastname}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-2 bg-gray-100 rounded shadow h-64">
            <h3 className="text-lg font-semibold text-center mb-2">
              Last 7 Days
            </h3>
            <Line data={getChartData("7-days")} options={chartOptions} />
          </div>
          <div className="p-2 bg-gray-100 rounded shadow h-64">
            <h3 className="text-lg font-semibold text-center mb-2">
              Last Month
            </h3>
            <Line data={getChartData("month")} options={chartOptions} />
          </div>
          <div className="p-2 bg-gray-100 rounded shadow h-64">
            <h3 className="text-lg font-semibold text-center mb-2">
              Last Year
            </h3>
            <Line data={getChartData("year")} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerVisitPerformance;
