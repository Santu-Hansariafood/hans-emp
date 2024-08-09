import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdAssignmentTurnedIn } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const GivenTaskStatus = () => {
  const location = useLocation();
  const { employee } = location.state || {};
  const [tasks, setTasks] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (employee) {
      fetchTasks();
      fetchAssignees();
    }
  }, [employee]);

  // Fetch tasks assigned by the logged-in employee
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://main-server-2kc5.onrender.com/api/tasks");
      const employeeFullName = `${employee.firstname} ${employee.lastname}`;
      const employeeTasks = response.data.tasks.filter(
        (task) => task.appointedBy === employeeFullName
      );
      setTasks(employeeTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchAssignees = async () => {
    try {
      const response = await axios.get("https://main-server-2kc5.onrender.com/api/employees");
      console.log("Assignees fetched: ", response.data.employees);
      setAssignees(response.data); // Ensure you are setting the correct data from the API response
    } catch (error) {
      console.error("Error fetching assignees:", error);
    }
  };

  // Handle reassignment of a task
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
            }
          );
          Swal.fire("Reassigned!", "The task has been reassigned.", "success");
          fetchTasks(); // Refresh tasks after reassignment
        } catch (error) {
          Swal.fire("Error!", "Failed to reassign the task.", "error");
          console.error("Error reassigning task:", error);
        }
      }
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Assigned Tasks</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Task Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Assignee</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Feedback</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td className="border p-2">{task.taskName}</td>
                <td className="border p-2">{task.taskDescription}</td>
                <td className="border p-2">{task.priority}</td>
                <td className="border p-2">{task.assignTo}</td>
                <td className="border p-2">{task.status}</td>
                <td className="border p-2">{task.feedback || "No Feedback"}</td>
                <td className="border p-2">
                  {task.status === "Rejected" && (
                    <button
                      onClick={() => handleReassign(task._id)}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      <MdAssignmentTurnedIn title="Re-Assign" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-2">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GivenTaskStatus;
