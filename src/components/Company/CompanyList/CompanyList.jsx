import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import CompanyTable from "./CompanyTable/CompanyTable";
import SearchBar from "./SearchBar/SearchBar";
import PaginationControls from "./PaginationControls/PaginationControls";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/companies"
      );
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleView = (company) => {
    Swal.fire({
      title: "View Company",
      html: `
        <p><strong>Company Name:</strong> ${company.companyName}</p>
        <p><strong>Location:</strong> ${company.location}</p>
        <p><strong>Billing Address:</strong> ${company.billingAddress}</p>
        <p><strong>GST No.:</strong> ${company.gstNo}</p>
      `,
      focusConfirm: false,
      confirmButtonText: "Close",
    });
  };

  const handleEdit = (company) => {
    Swal.fire({
      title: "Edit Company",
      html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Company Name" value="${company.companyName}">
        <input type="text" id="swal-input2" class="swal2-input" placeholder="Location" value="${company.location}">
        <input type="text" id="swal-input3" class="swal2-input" placeholder="Billing Address" value="${company.billingAddress}">
        <input type="text" id="swal-input4" class="swal2-input" placeholder="GST No." value="${company.gstNo}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Update",
      preConfirm: async () => {
        const updatedCompany = {
          companyName: document.getElementById("swal-input1").value,
          location: document.getElementById("swal-input2").value,
          billingAddress: document.getElementById("swal-input3").value,
          gstNo: document.getElementById("swal-input4").value,
        };
        try {
          await axios.put(
            `http://localhost:3000/api/companies/${company._id}`,
            updatedCompany
          );
          Swal.fire(
            "Updated!",
            `Company with ID: ${company._id} has been updated.`,
            "success"
          );
          fetchCompanies();
        } catch (error) {
          console.error("Error updating company:", error);
          Swal.fire(
            "Error!",
            "There was a problem updating the company",
            "error"
          );
        }
      },
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:3000/api/companies/${id}`
          );
          Swal.fire(
            "Deleted!",
            `Company with ID: ${id} has been deleted.`,
            "success"
          );
          setCompanies(companies.filter((company) => company._id !== id));
        } catch (error) {
          console.error("Error deleting company:", error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the company",
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

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm)
  );

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < filteredCompanies.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Company Master</h2>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <CompanyTable
        companies={paginatedCompanies}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <PaginationControls
        currentPage={currentPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        totalItems={filteredCompanies.length}
        pageSize={pageSize}
        navigate={navigate}
      />
    </div>
  );
};

export default CompanyList;
