import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SearchInput from "./SearchInput/SearchInput";
import Pagination from "./Pagination/Pagination";
import ConsigneeRow from "./ConsigneeRow/ConsigneeRow";

const ConsigneeTable = () => {
  const [consigneeData, setConsigneeData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchConsigneeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/consignees");
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
        <input id="swal-input1" class="swal2-input" placeholder="Consignee Name" value="${consignee.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Mobile" value="${consignee.mobile}">
        <input id="swal-input3" class="swal2-input" placeholder="Email" value="${consignee.email}">
        <input id="swal-input4" class="swal2-input" placeholder="Address" value="${consignee.address}">
        <input id="swal-input5" class="swal2-input" placeholder="GST No" value="${consignee.gstNo}">
        <input id="swal-input6" class="swal2-input" placeholder="PAN No" value="${consignee.panNo}">
        <input id="swal-input7" class="swal2-input" placeholder="State" value="${consignee.state}">
        <input id="swal-input8" class="swal2-input" placeholder="Location" value="${consignee.location}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const updatedConsignee = {
          _id: consignee._id,
          name: document.getElementById("swal-input1").value,
          mobile: document.getElementById("swal-input2").value,
          email: document.getElementById("swal-input3").value,
          address: document.getElementById("swal-input4").value,
          gstNo: document.getElementById("swal-input5").value,
          panNo: document.getElementById("swal-input6").value,
          state: document.getElementById("swal-input7").value,
          location: document.getElementById("swal-input8").value,
        };
        return updatedConsignee;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedConsignee = result.value;
        axios
          .put(
            `http://localhost:3000/api/consignees/${updatedConsignee._id}`,
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
          .delete(`http://localhost:3000/api/consignees/${id}`)
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
      <SearchInput searchInput={searchInput} handleSearchChange={handleSearchChange} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="bg-gradient-to-r from-green-400 to-yellow-500 text-white">
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
            {currentData.map((consignee, index) => (
              <ConsigneeRow
                key={index}
                consignee={consignee}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ConsigneeTable;
