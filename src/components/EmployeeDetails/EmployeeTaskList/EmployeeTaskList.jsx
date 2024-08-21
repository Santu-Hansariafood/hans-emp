import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const EmployeeTaskList = ({ employee }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingTask, setUpdatingTask] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://main-server-2kc5.onrender.com/api/tasks`
      );
      const employeeFullName = `${employee.firstname} ${employee.lastname}`;
      const employeeTasks = response.data.tasks
        .filter((task) => task.assignTo === employeeFullName)
        .filter((task) => task.status !== "Complete"); // Exclude "Complete" tasks
      setTasks(employeeTasks);
      setTotalPages(Math.ceil(employeeTasks.length / itemsPerPage));
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
        Rejected: "Rejected",
      },
      inputPlaceholder: "Select new status",
      showCancelButton: true,
      inputValue: currentStatus,
    });

    if (status) {
      let feedback = null;
      if (status === "Rejected") {
        const { value: comment } = await Swal.fire({
          title: "Add Comment",
          input: "textarea",
          inputPlaceholder: "Enter your comment here...",
          showCancelButton: true,
        });

        if (comment) {
          feedback = comment;
        } else {
          Swal.fire("Error", "Comment is required for rejection", "error");
          setUpdatingTask(null);
          return;
        }
      }

      try {
        await axios.patch(
          `https://main-server-2kc5.onrender.com/api/tasks/${taskId}/status`,
          { status, feedback }
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

  const currentTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (tasks.length === 0) {
    return (
      <p className="text-red-500 italic">No tasks assigned to this employee.</p>
    );
  }

  return (
    <div className="mt-8 px-4">
      <h3 className="text-xl md:text-2xl font-bold mb-4 items-center">Assigned Tasks</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr>
              <th className="border p-2">Task Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Assignee By</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Feedback</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task._id}>
                <td className="border p-2">{task.taskName}</td>
                <td className="border p-2">{task.taskDescription}</td>
                <td className="border p-2">{task.priority}</td>
                <td className="border p-2">{task.appointedBy}</td>
                <td className="border p-2">{task.status}</td>
                <td className="border p-2">{task.feedback}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleChangeStatus(task._id, task.status)}
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg transition duration-300 ${
                      task.status === "Complete"
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    disabled={
                      task.status === "Complete" || updatingTask === task._id
                    }
                  >
                    <MdOutlineTaskAlt title="Change Status" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          <FaCaretLeft title="Previous" />
        </button>
        <span className="text-lg md:text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
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
