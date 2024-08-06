import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FaChevronLeft, FaCaretRight } from "react-icons/fa";

const EmployeeTaskList = ({ employee }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingTask, setUpdatingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://main-server-2kc5.onrender.com/api/tasks?page=${currentPage}&limit=10`
      );
      const employeeFullName = `${employee.firstname} ${employee.lastname}`;
      const employeeTasks = response.data.tasks.filter(
        (task) => task.assignTo === employeeFullName
      );
      setTasks(employeeTasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch tasks", "error");
    }
  };

  const handleChangeStatus = async (taskId, currentStatus) => {
    setUpdatingTask(taskId);
    const { value: status } = await Swal.fire({
      title: "Change Task Status",
      input: "select",
      inputOptions: {
        Pending: "Pending",
        Accepted: "Accepted",
        Complete: "Complete",
      },
      inputPlaceholder: "Select new status",
      showCancelButton: true,
      inputValue: currentStatus,
    });

    if (status) {
      try {
        await axios.patch(
          `https://main-server-2kc5.onrender.com/api/tasks/${taskId}/status`,
          { status }
        );
        Swal.fire("Success", "Task status updated successfully", "success");
        fetchTasks();
      } catch (error) {
        Swal.fire("Error", "Failed to update task status", "error");
      } finally {
        setUpdatingTask(null);
      }
    } else {
      setUpdatingTask(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (tasks.length === 0) {
    return <p>No tasks assigned to this employee.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Assigned Tasks</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Task Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="border p-2">{task.taskName}</td>
              <td className="border p-2">{task.taskDescription}</td>
              <td className="border p-2">{task.priority}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2 align-middle">
                <button
                  onClick={() => handleChangeStatus(task._id, task.status)}
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg transition duration-300 ${
                    task.status === "Complete" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={task.status === "Complete" || updatingTask === task._id}
                >
                  <MdOutlineTaskAlt title="Change Status" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          <FaChevronLeft title="Previous" />
        </button>
        <span className="text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          <FaCaretRight title="Next" />
        </button>
      </div>
    </div>
  );
};

export default EmployeeTaskList;
