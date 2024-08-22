import React from "react";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const BuyerActions = ({ buyer, onEdit, handleDelete }) => {
  const handleView = () => {
    Swal.fire({
      title: `<strong>${buyer.name}</strong>`,
      html: `
        <p><strong>Mobile:</strong> ${buyer.mobile}</p>
        <p><strong>Email:</strong> ${buyer.email}</p>
        <p><strong>Company Name:</strong> ${buyer.companyName}</p>
        <p><strong>Location:</strong> ${buyer.location}</p>
        <p><strong>GST No:</strong> ${buyer.gstNo}</p>
        <p><strong>Billing Address:</strong> ${buyer.billingAddress}</p>
        <p><strong>Shipping Address:</strong> ${buyer.shippingAddress}</p>
      `,
      icon: "info",
      confirmButtonText: "Close",
      customClass: {
        popup: "text-left",
      },
    });
  };

  const handleEditBuyer = () => {
    Swal.fire({
      title: 'Edit Buyer',
      html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${buyer.name}" />
        <input id="mobile" class="swal2-input" placeholder="Mobile" value="${buyer.mobile}" />
        <input id="email" class="swal2-input" placeholder="Email" value="${buyer.email}" />
        <input id="companyName" class="swal2-input" placeholder="Company Name" value="${buyer.companyName}" />
        <input id="location" class="swal2-input" placeholder="Location" value="${buyer.location}" />
        <input id="gstNo" class="swal2-input" placeholder="GST No" value="${buyer.gstNo}" />
        <input id="billingAddress" class="swal2-input" placeholder="Billing Address" value="${buyer.billingAddress}" />
        <input id="shippingAddress" class="swal2-input" placeholder="Shipping Address" value="${buyer.shippingAddress}" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const editedBuyer = {
          ...buyer,
          name: document.getElementById('name').value,
          mobile: document.getElementById('mobile').value,
          email: document.getElementById('email').value,
          companyName: document.getElementById('companyName').value,
          location: document.getElementById('location').value,
          gstNo: document.getElementById('gstNo').value,
          billingAddress: document.getElementById('billingAddress').value,
          shippingAddress: document.getElementById('shippingAddress').value,
        };
        onEdit(editedBuyer);
      },
    });
  };

  return (
    <>
      <button
        onClick={handleView}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      >
        <FaRegEye title="View" />
      </button>
      <button
        onClick={handleEditBuyer}
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
    </>
  );
};

export default BuyerActions;
