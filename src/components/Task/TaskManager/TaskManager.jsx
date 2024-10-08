import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [priority, setPriority] = useState("High");
  const [appointedBy, setAppointedBy] = useState("");
  const [creationDateTime, setCreationDateTime] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName } = location.state || {};

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    setCreationDateTime(new Date().toLocaleString());
    
    if (fullName) {
      setAppointedBy(fullName);  // Setting the fullName as appointedBy when available
    }
  }, [fullName]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://main-server-2kc5.onrender.com/api/tasks"
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://main-server-2kc5.onrender.com/api/employees"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const newTask = {
        taskName,
        taskDescription,
        assignTo,
        priority,
        appointedBy,
        creationDateTime: new Date().toISOString(),
      };
      const response = await axios.post(
        "https://main-server-2kc5.onrender.com/api/tasks",
        newTask
      );
      console.log("Task Created:", response.data);
      fetchTasks();
      Swal.fire({
        icon: "success",
        title: "Task Created",
        text: "Task created successfully!",
      });
      setTaskName("");
      setTaskDescription("");
      setAssignTo("");
      setPriority("High");
      setAppointedBy(fullName);  // Resetting appointedBy back to fullName or empty if no fullName
      setCreationDateTime(new Date().toLocaleString());
    } catch (error) {
      console.error("Error Creating Task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "There was an error creating the task.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-10 rounded-lg shadow-lg bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <select
          className="w-full p-2 mb-2 border rounded"
          value={assignTo}
          onChange={(e) => setAssignTo(e.target.value)}
        >
          <option value="">Select Assignee</option>
          {employees.map((employee) => (
            <option
              key={employee._id}
              value={`${employee.firstname} ${employee.lastname}`}
            >
              {employee.firstname} {employee.lastname}
            </option>
          ))}
        </select>
        <select
          className="w-full p-2 mb-2 border rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          className="w-full p-2 mb-2 border rounded"
          value={appointedBy}
          onChange={(e) => setAppointedBy(e.target.value)}
        >
          <option value={appointedBy}>{appointedBy}</option>
        </select>
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Creation Date & Time"
          value={creationDateTime}
          readOnly
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded mt-2"
          onClick={handleCreateTask}
        >
          Create Task
        </button>
        <button
          className="w-full p-2 bg-gray-500 text-white rounded mt-2"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TaskManager;
