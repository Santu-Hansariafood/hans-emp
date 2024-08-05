import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://main-server-2kc5.onrender.com/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditTask = async (task) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Task',
      html:
        `<input id="taskName" class="swal2-input" placeholder="Task Name" value="${task.taskName}" />` +
        `<textarea id="taskDescription" class="swal2-textarea" placeholder="Task Description">${task.taskDescription}</textarea>` +
        `<input id="priority" class="swal2-input" placeholder="Priority" value="${task.priority}" />`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          taskName: document.getElementById('taskName').value,
          taskDescription: document.getElementById('taskDescription').value,
          priority: document.getElementById('priority').value
        }
      }
    });

    if (formValues) {
      try {
        await axios.patch(`https://main-server-2kc5.onrender.com/api/tasks/${task._id}`, formValues);
        fetchTasks();
        Swal.fire('Task Updated', '', 'success');
      } catch (error) {
        Swal.fire('Error', 'There was an error updating the task.', 'error');
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the task permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://main-server-2kc5.onrender.com/api/tasks/${taskId}`);
        fetchTasks();
        Swal.fire('Deleted!', 'The task has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'There was an error deleting the task.', 'error');
      }
    }
  };

  const handleGenerateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    XLSX.writeFile(wb, "Tasks.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-4 p-2 bg-gray-500 text-white rounded"
        onClick={() => navigate('/task-manager')}
      >
        Back
      </button>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleGenerateExcel}
      >
        Generate Excel
      </button>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Task Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Assignee</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="border p-2">{task.taskName}</td>
                <td className="border p-2">{task.taskDescription}</td>
                <td className="border p-2">{task.assignTo}</td>
                <td className="border p-2">{task.priority}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
