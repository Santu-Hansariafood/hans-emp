import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BuyerTable from "./BuyerTable/BuyerTable";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "./Pagination/Pagination";

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
      const response = await axios.get("https://main-server-9oo9.onrender.com/buyer");
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
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <label for="swal-input1" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="swal-input1" class="swal2-input mt-1 block w-full" value="${buyer.name}">
          </div>
          <div class="col-span-1">
            <label for="swal-input2" class="block text-sm font-medium text-gray-700">Mobile</label>
            <input type="text" id="swal-input2" class="swal2-input mt-1 block w-full" value="${buyer.mobile}">
          </div>
          <div class="col-span-1">
            <label for="swal-input3" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="text" id="swal-input3" class="swal2-input mt-1 block w-full" value="${buyer.email}">
          </div>
          <div class="col-span-1">
            <label for="swal-input4" class="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" id="swal-input4" class="swal2-input mt-1 block w-full" value="${buyer.companyName}">
          </div>
          <div class="col-span-1">
            <label for="swal-input5" class="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" id="swal-input5" class="swal2-input mt-1 block w-full" value="${buyer.location}">
          </div>
          <div class="col-span-1">
            <label for="swal-input6" class="block text-sm font-medium text-gray-700">GST No</label>
            <input type="text" id="swal-input6" class="swal2-input mt-1 block w-full" value="${buyer.gstNo}">
          </div>
          <div class="col-span-1">
            <label for="swal-input7" class="block text-sm font-medium text-gray-700">Billing Address</label>
            <input type="text" id="swal-input7" class="swal2-input mt-1 block w-full" value="${buyer.billingAddress}">
          </div>
          <div class="col-span-1">
            <label for="swal-input8" class="block text-sm font-medium text-gray-700">Shipping Address</label>
            <input type="text" id="swal-input8" class="swal2-input mt-1 block w-full" value="${buyer.shippingAddress}">
          </div>
          <div class="col-span-1">
            <label for="swal-input9" class="block text-sm font-medium text-gray-700">Mapped Financer</label>
            <input type="text" id="swal-input9" class="swal2-input mt-1 block w-full" value="${buyer.mappedFinancer}">
          </div>
          <div class="col-span-1">
            <label for="swal-input10" class="block text-sm font-medium text-gray-700">State</label>
            <input type="text" id="swal-input10" class="swal2-input mt-1 block w-full" value="${buyer.state}">
          </div>
          <div class="col-span-1">
            <label for="swal-input11" class="block text-sm font-medium text-gray-700">PAN No</label>
            <input type="text" id="swal-input11" class="swal2-input mt-1 block w-full" value="${buyer.panNo}">
          </div>
          <div class="col-span-1">
            <label for="swal-input12" class="block text-sm font-medium text-gray-700">Products</label>
            <input type="text" id="swal-input12" class="swal2-input mt-1 block w-full" value="${buyer.products}">
          </div>
          <div class="col-span-1">
            <label for="swal-input13" class="block text-sm font-medium text-gray-700">Biding Locations</label>
            <input type="text" id="swal-input13" class="swal2-input mt-1 block w-full" value="${buyer.bidingLocations}">
          </div>
          <div class="col-span-1">
            <label for="swal-input14" class="block text-sm font-medium text-gray-700">City Origins</label>
            <input type="text" id="swal-input14" class="swal2-input mt-1 block w-full" value="${buyer.cityOrigins}">
          </div>
          <div class="col-span-1">
            <label for="swal-input15" class="block text-sm font-medium text-gray-700">Other Companies</label>
            <input type="text" id="swal-input15" class="swal2-input mt-1 block w-full" value="${buyer.otherCompanies}">
          </div>
          <div class="col-span-1">
            <label for="swal-input16" class="block text-sm font-medium text-gray-700">Consignees</label>
            <input type="text" id="swal-input16" class="swal2-input mt-1 block w-full" value="${buyer.consignees}">
          </div>
        </div>
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
            `https://main-server-9oo9.onrender.com/buyer/${buyer._id}`,
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
          await axios.delete(`https://main-server-9oo9.onrender.com/buyer/${id}`);
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
        <SearchBar handleSearch={handleSearch} />
      </div>
      <BuyerTable
        buyers={paginatedBuyers}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredBuyers.length}
        pageSize={pageSize}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        navigate={navigate}
      />
    </div>
  );
};

export default BuyerList;
