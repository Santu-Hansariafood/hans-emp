import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdAssignmentTurnedIn } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const GivenTaskStatus = () => {
  const location = useLocation();
  const { employee } = location.state || {};
  const [tasks, setTasks] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (employee) {
      fetchTasks();
      fetchAssignees();
    }
  }, [employee, currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://main-server-2kc5.onrender.com/api/tasks?page=${currentPage}&limit=10`
      );
      const employeeFullName = `${employee.firstname} ${employee.lastname}`;
      const employeeTasks = response.data.tasks.filter(
        (task) => task.appointedBy === employeeFullName
      );
      setTasks(employeeTasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchAssignees = async () => {
    try {
      const response = await axios.get(
        "https://main-server-2kc5.onrender.com/api/employees"
      );
      setAssignees(response.data);
    } catch (error) {
      console.error("Error fetching assignees:", error);
    }
  };

  const handleReassign = (taskId) => {
    if (!assignees || assignees.length === 0) {
      Swal.fire("Error", "No assignees available for reassignment", "error");
      return;
    }

    const assigneeOptions = assignees.reduce((options, assignee) => {
      options[assignee._id] = `${assignee.firstname} ${assignee.lastname}`;
      return options;
    }, {});

    MySwal.fire({
      title: "Reassign Task",
      input: "select",
      inputOptions: assigneeOptions,
      inputPlaceholder: "Select Assignee",
      showCancelButton: true,
      confirmButtonText: "Reassign",
      preConfirm: (selectedValue) => {
        if (selectedValue) {
          return selectedValue;
        } else {
          Swal.showValidationMessage("Please select an assignee");
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const selectedAssignee = assignees.find(
            (assignee) => assignee._id === result.value
          );
          const selectedAssigneeName = `${selectedAssignee.firstname} ${selectedAssignee.lastname}`;

          await axios.patch(
            `https://main-server-2kc5.onrender.com/api/tasks/${taskId}/reassign`,
            {
              assignTo: selectedAssigneeName,
              appointedBy: `${employee.firstname} ${employee.lastname}`,
              status: "Assigned",
            }
          );
          Swal.fire("Reassigned!", "The task has been reassigned.", "success");
          fetchTasks();
        } catch (error) {
          Swal.fire("Error!", "Failed to reassign the task.", "error");
          console.error("Error reassigning task:", error);
        }
      }
    });
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

  return (
    <div className="mt-8 px-4 md:px-8">
      <h3 className="text-xl md:text-2xl font-bold mb-4">Re-Assigned Tasks</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-xs md:text-sm">Task Name</th>
              <th className="border p-2 text-xs md:text-sm">Description</th>
              <th className="border p-2 text-xs md:text-sm">Priority</th>
              <th className="border p-2 text-xs md:text-sm">Assignee</th>
              <th className="border p-2 text-xs md:text-sm">Status</th>
              <th className="border p-2 text-xs md:text-sm">Feedback</th>
              <th className="border p-2 text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => {
                if (task.status === "Complete") {
                  return null; // Skip rendering this row
                }
                return (
                  <tr key={task._id}>
                    <td className="border p-2 text-xs md:text-sm">
                      {task.taskName}
                    </td>
                    <td className="border p-2 text-xs md:text-sm">
                      {task.taskDescription}
                    </td>
                    <td className="border p-2 text-xs md:text-sm">
                      {task.priority}
                    </td>
                    <td className="border p-2 text-xs md:text-sm">
                      {task.assignTo}
                    </td>
                    <td
                      className={`border p-2 text-xs md:text-sm ${
                        task.status === "Rejected" ? "text-red-500" : ""
                      } ${task.status === "Accepted" ? "text-green-500" : ""}`}
                    >
                      {task.status}
                    </td>
                    <td className="border p-2 text-xs md:text-sm">
                      {task.feedback || "No Feedback"}
                    </td>
                    <td className="border p-2 text-xs md:text-sm">
                      {task.status === "Rejected" && (
                        <button
                          onClick={() => handleReassign(task._id)}
                          className="bg-blue-500 text-white p-1 md:p-2 rounded"
                        >
                          <MdAssignmentTurnedIn title="Re-Assign" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-2 text-xs md:text-sm">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaCaretLeft title="Previous" />
        </button>
        <span className="text-sm md:text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaCaretRight title="Next" />
        </button>
      </div>
    </div>
  );
};

export default GivenTaskStatus;
