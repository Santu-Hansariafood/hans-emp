import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/buyer");
      setBuyers(response.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const handleView = (buyer) => {
    Swal.fire({
      title: `${buyer.name}`,
      html: `
        <p><strong>Mobile:</strong> ${buyer.mobile}</p>
        <p><strong>Email:</strong> ${buyer.email}</p>
        <p><strong>Company Name:</strong> ${buyer.companyName}</p>
        <p><strong>Location:</strong> ${buyer.location}</p>
        <p><strong>GST No:</strong> ${buyer.gstNo}</p>
        <p><strong>Billing Address:</strong> ${buyer.billingAddress}</p>
        <p><strong>Shipping Address:</strong> ${buyer.shippingAddress}</p>
        <p><strong>Mapped Financer:</strong> ${buyer.mappedFinancer}</p>
        <p><strong>State:</strong> ${buyer.state}</p>
        <p><strong>PAN No:</strong> ${buyer.panNo}</p>
        <p><strong>Products:</strong> ${buyer.products}</p>
        <p><strong>Biding Locations:</strong> ${buyer.bidingLocations}</p>
        <p><strong>City Origins:</strong> ${buyer.cityOrigins}</p>
        <p><strong>Other Companies:</strong> ${buyer.otherCompanies}</p>
        <p><strong>Consignees:</strong> ${buyer.consignees}</p>
      `,
      focusConfirm: false,
      confirmButtonText: "Close",
    });
  };

  const handleEdit = (buyer) => {
    Swal.fire({
      title: "Edit Buyer",
      html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Name" value="${buyer.name}">
        <input type="text" id="swal-input2" class="swal2-input" placeholder="Mobile" value="${buyer.mobile}">
        <input type="text" id="swal-input3" class="swal2-input" placeholder="Email" value="${buyer.email}">
        <input type="text" id="swal-input4" class="swal2-input" placeholder="Company Name" value="${buyer.companyName}">
        <input type="text" id="swal-input5" class="swal2-input" placeholder="Location" value="${buyer.location}">
        <input type="text" id="swal-input6" class="swal2-input" placeholder="GST No" value="${buyer.gstNo}">
        <input type="text" id="swal-input7" class="swal2-input" placeholder="Billing Address" value="${buyer.billingAddress}">
        <input type="text" id="swal-input8" class="swal2-input" placeholder="Shipping Address" value="${buyer.shippingAddress}">
        <input type="text" id="swal-input9" class="swal2-input" placeholder="Mapped Financer" value="${buyer.mappedFinancer}">
        <input type="text" id="swal-input10" class="swal2-input" placeholder="State" value="${buyer.state}">
        <input type="text" id="swal-input11" class="swal2-input" placeholder="PAN No" value="${buyer.panNo}">
        <input type="text" id="swal-input12" class="swal2-input" placeholder="Products" value="${buyer.products}">
        <input type="text" id="swal-input13" class="swal2-input" placeholder="Biding Locations" value="${buyer.bidingLocations}">
        <input type="text" id="swal-input14" class="swal2-input" placeholder="City Origins" value="${buyer.cityOrigins}">
        <input type="text" id="swal-input15" class="swal2-input" placeholder="Other Companies" value="${buyer.otherCompanies}">
        <input type="text" id="swal-input16" class="swal2-input" placeholder="Consignees" value="${buyer.consignees}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Update",
      preConfirm: async () => {
        const updatedBuyer = {
          name: document.getElementById("swal-input1").value,
          mobile: document.getElementById("swal-input2").value,
          email: document.getElementById("swal-input3").value,
          companyName: document.getElementById("swal-input4").value,
          location: document.getElementById("swal-input5").value,
          gstNo: document.getElementById("swal-input6").value,
          billingAddress: document.getElementById("swal-input7").value,
          shippingAddress: document.getElementById("swal-input8").value,
          mappedFinancer: document.getElementById("swal-input9").value,
          state: document.getElementById("swal-input10").value,
          panNo: document.getElementById("swal-input11").value,
          products: document.getElementById("swal-input12").value,
          bidingLocations: document.getElementById("swal-input13").value,
          cityOrigins: document.getElementById("swal-input14").value,
          otherCompanies: document.getElementById("swal-input15").value,
          consignees: document.getElementById("swal-input16").value,
        };
        try {
          await axios.put(
            `http://localhost:3000/buyer/${buyer._id}`,
            updatedBuyer
          );
          Swal.fire(
            "Updated!",
            `Buyer with ID: ${buyer._id} has been updated.`,
            "success"
          );
          fetchBuyers();
        } catch (error) {
          console.error("Error updating buyer:", error);
          Swal.fire(
            "Error!",
            "There was a problem updating the buyer",
            "error"
          );
        }
      },
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/buyer/${id}`);
          setBuyers(buyers.filter((buyer) => buyer._id !== id));
          Swal.fire(
            "Deleted!",
            `Buyer with ID: ${id} has been deleted.`,
            "success"
          );
        } catch (error) {
          console.error("Error deleting buyer:", error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the buyer",
            "error"
          );
        }
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredBuyers = buyers.filter(
    (buyer) =>
      buyer.name.toLowerCase().includes(searchTerm) ||
      buyer.companyName.toLowerCase().includes(searchTerm)
  );

  const paginatedBuyers = filteredBuyers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < filteredBuyers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Buyer List</h2>
        <input
          type="text"
          placeholder="Search by name or company"
          className="border rounded py-2 px-3"
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">GST No</th>
              <th className="py-2 px-4 border-b">Billing Address</th>
              <th className="py-2 px-4 border-b">Shipping Address</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBuyers.map((buyer) => (
              <tr key={buyer._id}>
                <td className="py-2 px-4 border-b">{buyer.name}</td>
                <td className="py-2 px-4 border-b">{buyer.mobile}</td>
                <td className="py-2 px-4 border-b">{buyer.email}</td>
                <td className="py-2 px-4 border-b">{buyer.companyName}</td>
                <td className="py-2 px-4 border-b">{buyer.location}</td>
                <td className="py-2 px-4 border-b">{buyer.gstNo}</td>
                <td className="py-2 px-4 border-b">{buyer.billingAddress}</td>
                <td className="py-2 px-4 border-b">{buyer.shippingAddress}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => handleView(buyer)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    <FaRegEye title="View" />
                  </button>
                  <button
                    onClick={() => handleEdit(buyer)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    <CiEdit title="Edit" />
                  </button>
                  <button
                    onClick={() => handleDelete(buyer._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    <MdDeleteForever title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
        </div>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * pageSize >= filteredBuyers.length}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BuyerList;
