import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const EmpPerformance = () => {
  const location = useLocation();
  const { fullName } = location.state || {};

  const [weeklyData, setWeeklyData] = useState({ labels: [], datasets: [] });
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [yearlyData, setYearlyData] = useState({ labels: [], datasets: [] });

  const [totalWeeklyDistance, setTotalWeeklyDistance] = useState(0);
  const [totalMonthlyDistance, setTotalMonthlyDistance] = useState(0);
  const [totalYearlyDistance, setTotalYearlyDistance] = useState(0);

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://main-server-2kc5.onrender.com/api/travel-details/travel-details"
        );
        const data = await response.json();

        // Weekly Report
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 6);

        const weeklyFilteredData = data
          .filter((item) => item.employeeName === fullName)
          .map((item) => {
            const date = parseDate(item.date);
            const distance = Math.max(
              parseInt(item.endReading, 10) - parseInt(item.startReading, 10),
              0
            );
            return { date, distance };
          })
          .filter((item) => item.date >= startDate && item.date <= today);

        const weeklyLabels = [];
        const weeklyDistances = [];
        let totalWeekly = 0;

        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          const dayLabel = currentDate.toLocaleDateString("en-US", {
            weekday: "long",
          });
          weeklyLabels.push(dayLabel);

          const dayData = weeklyFilteredData
            .filter((d) => d.date.toDateString() === currentDate.toDateString())
            .reduce((sum, d) => sum + d.distance, 0);

          weeklyDistances.push(dayData);
          totalWeekly += dayData;
        }

        setWeeklyData({
          labels: weeklyLabels,
          datasets: [
            {
              label: "Distance Traveled (KM)",
              data: weeklyDistances,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        });
        setTotalWeeklyDistance(totalWeekly);

        // Monthly Report
        const currentMonth = today.getMonth();
        const monthlyFilteredData = data.filter(
          (item) =>
            item.employeeName === fullName &&
            parseDate(item.date).getMonth() === currentMonth
        );

        const daysInMonth = new Date(
          today.getFullYear(),
          currentMonth + 1,
          0
        ).getDate();
        const monthlyLabels = Array.from(
          { length: daysInMonth },
          (_, i) => i + 1
        );
        const monthlyDistances = Array(daysInMonth).fill(0);

        let totalMonthly = 0;
        monthlyFilteredData.forEach((item) => {
          const date = parseDate(item.date);
          const day = date.getDate();
          const distance = Math.max(
            parseInt(item.endReading, 10) - parseInt(item.startReading, 10),
            0
          );
          monthlyDistances[day - 1] += distance;
          totalMonthly += distance;
        });

        setMonthlyData({
          labels: monthlyLabels,
          datasets: [
            {
              label: "Distance Traveled (KM)",
              data: monthlyDistances,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
        setTotalMonthlyDistance(totalMonthly);

        // Yearly Report
        const yearlyFilteredData = data.filter(
          (item) => item.employeeName === fullName
        );
        const yearlyDistances = Array(12).fill(0);
        let totalYearly = 0;

        yearlyFilteredData.forEach((item) => {
          const date = parseDate(item.date);
          const month = date.getMonth();
          const distance = Math.max(
            parseInt(item.endReading, 10) - parseInt(item.startReading, 10),
            0
          );
          yearlyDistances[month] += distance;
          totalYearly += distance;
        });

        const yearlyLabels = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        setYearlyData({
          labels: yearlyLabels,
          datasets: [
            {
              label: "Distance Traveled (KM)",
              data: yearlyDistances,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        });
        setTotalYearlyDistance(totalYearly);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fullName]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{fullName} - Travel Reports</h2>

      {/* Weekly Report */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Weekly Travel Report</h3>
        <div style={{ height: "400px" }}>
          <Line data={weeklyData} options={{ responsive: true }} />
        </div>
        <div className="mt-4 text-xl font-semibold">
          Total Weekly Distance: {totalWeeklyDistance} KM
        </div>
      </div>

      {/* Monthly Report */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Monthly Travel Report</h3>
        <div style={{ height: "400px" }}>
          <Bar data={monthlyData} options={{ responsive: true }} />
        </div>
        <div className="mt-4 text-xl font-semibold">
          Total Monthly Distance: {totalMonthlyDistance} KM
        </div>
      </div>

      {/* Yearly Report */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Yearly Travel Report</h3>
        <div style={{ height: "400px" }}>
          <Line data={yearlyData} options={{ responsive: true }} />
        </div>
        <div className="mt-4 text-xl font-semibold">
          Total Yearly Distance: {totalYearlyDistance} KM
        </div>
      </div>
    </div>
  );
};

export default EmpPerformance;
