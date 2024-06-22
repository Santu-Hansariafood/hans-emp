import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ConsigneeTable = () => {
  const [consigneeData, setConsigneeData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchConsigneeData = async () => {
      try {
        const response = await axios.get("https://main-server-2kc5.onrender.com/api/consignees");
        const data = response.data;
        if (Array.isArray(data)) {
          setConsigneeData(data);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching consignee data:", error);
      }
    };
    fetchConsigneeData();
  }, []);

  const filteredData = Array.isArray(consigneeData)
    ? consigneeData.filter((consignee) =>
        consignee.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const groupedData = filteredData.reduce((acc, item) => {
    const companyName = item.companyName;
    if (!acc[companyName]) {
      acc[companyName] = [];
    }
    acc[companyName].push(item);
    return acc;
  }, {});

  const groupedArray = Object.keys(groupedData).map((companyName) => ({
    companyName,
    consignees: groupedData[companyName],
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = groupedArray.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(groupedArray.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleEdit = (consignee) => {
    Swal.fire({
      title: "Edit Consignee",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Company Name" value="${consignee.companyName}" readonly>
        <input id="swal-input2" class="swal2-input" placeholder="Consignee Name" value="${consignee.name}">
        <input id="swal-input3" class="swal2-input" placeholder="Mobile" value="${consignee.mobile}">
        <input id="swal-input4" class="swal2-input" placeholder="Email" value="${consignee.email}">
        <input id="swal-input5" class="swal2-input" placeholder="Address" value="${consignee.address}">
        <input id="swal-input6" class="swal2-input" placeholder="GST No" value="${consignee.gstNo}">
        <input id="swal-input7" class="swal2-input" placeholder="PAN No" value="${consignee.panNo}">
        <input id="swal-input8" class="swal2-input" placeholder="State" value="${consignee.state}">
        <input id="swal-input9" class="swal2-input" placeholder="Location" value="${consignee.location}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const updatedConsignee = {
          _id: consignee._id,
          companyName: document.getElementById("swal-input1").value,
          name: document.getElementById("swal-input2").value,
          mobile: document.getElementById("swal-input3").value,
          email: document.getElementById("swal-input4").value,
          address: document.getElementById("swal-input5").value,
          gstNo: document.getElementById("swal-input6").value,
          panNo: document.getElementById("swal-input7").value,
          state: document.getElementById("swal-input8").value,
          location: document.getElementById("swal-input9").value,
        };
        return updatedConsignee;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedConsignee = result.value;
        axios
          .put(
            `https://main-server-2kc5.onrender.com/api/consignees/${updatedConsignee._id}`,
            updatedConsignee
          )
          .then(() => {
            setConsigneeData((prevData) =>
              prevData.map((item) =>
                item._id === updatedConsignee._id ? updatedConsignee : item
              )
            );
            Swal.fire(
              "Updated!",
              "Consignee data has been updated.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error updating consignee data:", error);
            Swal.fire("Error!", "Failed to update consignee data.", "error");
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://main-server-2kc5.onrender.com/api/consignees/${id}`)
          .then(() => {
            setConsigneeData(
              consigneeData.filter((consignee) => consignee._id !== id)
            );
            Swal.fire("Deleted!", "The consignee has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting consignee data:", error);
            Swal.fire("Error!", "Failed to delete consignee data.", "error");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The consignee is safe :)", "error");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <button
        onClick={handleBackClick}
        className="mb-4 p-2 bg-gray-500 text-white rounded"
      >
        Back
      </button>
      <div className="mb-4">
        <input
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left border-b">Company Name</th>
              <th className="p-2 text-left border-b">Consignee Name</th>
              <th className="p-2 text-left border-b">Mobile</th>
              <th className="p-2 text-left border-b">Email</th>
              <th className="p-2 text-left border-b">Address</th>
              <th className="p-2 text-left border-b">GST No</th>
              <th className="p-2 text-left border-b">PAN No</th>
              <th className="p-2 text-left border-b">State</th>
              <th className="p-2 text-left border-b">Location</th>
              <th className="p-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((group, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-100">
                  <td
                    className="p-2 border-b"
                    rowSpan={group.consignees.length}
                  >
                    {group.companyName}
                  </td>
                  <td className="p-2 border-b">{group.consignees[0].name}</td>
                  <td className="p-2 border-b">{group.consignees[0].mobile}</td>
                  <td className="p-2 border-b">{group.consignees[0].email}</td>
                  <td className="p-2 border-b">
                    {group.consignees[0].address}
                  </td>
                  <td className="p-2 border-b">{group.consignees[0].gstNo}</td>
                  <td className="p-2 border-b">{group.consignees[0].panNo}</td>
                  <td className="p-2 border-b">{group.consignees[0].state}</td>
                  <td className="p-2 border-b">
                    {group.consignees[0].location}
                  </td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleEdit(group.consignees[0])}
                      className="p-1 bg-blue-500 text-white rounded mr-2"
                    >
                      <FaEdit title="Edit" />
                    </button>
                    <button
                      onClick={() => handleDelete(group.consignees[0]._id)}
                      className="p-1 bg-red-500 text-white rounded"
                    >
                      <MdDeleteForever title="Delete" />
                    </button>
                  </td>
                </tr>
                {group.consignees.slice(1).map((consignee, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="p-2 border-b">{consignee.name}</td>
                    <td className="p-2 border-b">{consignee.mobile}</td>
                    <td className="p-2 border-b">{consignee.email}</td>
                    <td className="p-2 border-b">{consignee.address}</td>
                    <td className="p-2 border-b">{consignee.gstNo}</td>
                    <td className="p-2 border-b">{consignee.panNo}</td>
                    <td className="p-2 border-b">{consignee.state}</td>
                    <td className="p-2 border-b">{consignee.location}</td>
                    <td className="p-2 border-b flex">
                      <button
                        onClick={() => handleEdit(consignee)}
                        className="p-1 bg-blue-500 text-white rounded mr-2"
                      >
                        <FaEdit title="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(consignee._id)}
                        className="p-1 bg-red-500 text-white rounded"
                      >
                        <MdDeleteForever title="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <ul className="inline-flex items-center -space-x-px">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                currentPage === index + 1 ? "text-blue-500" : ""
              }`}
            >
              <button
                onClick={() => handlePageChange(index + 1)}
                className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConsigneeTable;
