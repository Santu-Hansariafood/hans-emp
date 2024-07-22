import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const BidBuyerMaster = () => {
  const [bids, setBids] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(
          "https://main-server-2kc5.onrender.com/api/bids"
        );
        setBids(response.data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    fetchBids();
  }, []);

  const handleView = (bid) => {
    Swal.fire({
      title: "View Bid",
      html: `
        <strong>Buyer:</strong> ${bid.buyer}<br/>
        <strong>Phone Number:</strong> ${bid.buyerPhoneNumber}<br/>
        <strong>Location:</strong> ${bid.buyerLocation}<br/>
        <strong>Product:</strong> ${bid.product}<br/>
        <strong>Quantity:</strong> ${bid.quantity}<br/>
        <strong>Unit:</strong> ${bid.unit}<br/>
        <strong>Rate:</strong> ${bid.rateForBid}<br/>
        <strong>Date:</strong> ${bid.date}<br/>
        <strong>Start Time:</strong> ${bid.startTime}<br/>
        <strong>End Time:</strong> ${bid.endTime}<br/>
        <strong>Payment Terms:</strong> ${bid.paymentTerms}<br/>
        <strong>Delivery:</strong> ${bid.delivery}
      `,
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const handleEdit = async (bid) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Bid",
      html: `
        <input id="swal-input1" class="swal2-input" value="${bid.buyer}" placeholder="Buyer">
        <input id="swal-input2" class="swal2-input" value="${bid.buyerPhoneNumber}" placeholder="Phone Number">
        <input id="swal-input3" class="swal2-input" value="${bid.buyerLocation}" placeholder="Location">
        <input id="swal-input4" class="swal2-input" value="${bid.product}" placeholder="Product">
        <input id="swal-input5" class="swal2-input" value="${bid.quantity}" placeholder="Quantity">
        <input id="swal-input6" class="swal2-input" value="${bid.unit}" placeholder="Unit">
        <input id="swal-input7" class="swal2-input" value="${bid.rateForBid}" placeholder="Rate">
        <input id="swal-input8" class="swal2-input" value="${bid.date}" placeholder="Date">
        <input id="swal-input9" class="swal2-input" value="${bid.startTime}" placeholder="Start Time">
        <input id="swal-input10" class="swal2-input" value="${bid.endTime}" placeholder="End Time">
        <input id="swal-input11" class="swal2-input" value="${bid.paymentTerms}" placeholder="Payment Terms">
        <input id="swal-input12" class="swal2-input" value="${bid.delivery}" placeholder="Delivery">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          buyer: document.getElementById("swal-input1").value,
          buyerPhoneNumber: document.getElementById("swal-input2").value,
          buyerLocation: document.getElementById("swal-input3").value,
          product: document.getElementById("swal-input4").value,
          quantity: document.getElementById("swal-input5").value,
          unit: document.getElementById("swal-input6").value,
          rateForBid: document.getElementById("swal-input7").value,
          date: document.getElementById("swal-input8").value,
          startTime: document.getElementById("swal-input9").value,
          endTime: document.getElementById("swal-input10").value,
          paymentTerms: document.getElementById("swal-input11").value,
          delivery: document.getElementById("swal-input12").value,
        };
      },
    });

    if (formValues) {
      try {
        await axios.put(
          `https://main-server-2kc5.onrender.com/api/bids/${bid._id}`,
          formValues
        );
        setBids(
          bids.map((b) => (b._id === bid._id ? { ...b, ...formValues } : b))
        );
        Swal.fire({
          title: "Updated!",
          text: "Bid has been updated.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating bid:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error updating the bid. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleDelete = async (bidId) => {
    try {
      await axios.delete(
        `https://main-server-2kc5.onrender.com/api/bids/${bidId}`
      );
      setBids(bids.filter((bid) => bid._id !== bidId));
      Swal.fire({
        title: "Deleted!",
        text: "Bid has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting bid:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error deleting the bid. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bids);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bids");
    XLSX.writeFile(workbook, "bids.xlsx");
  };

  const filteredBids = bids.filter((bid) =>
    bid.buyer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Bid Buyer Master
      </h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by buyer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={generateExcel}
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          Generate Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300">Bid ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Buyer</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">
                Phone Number
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Location</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Product</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Quantity</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Unit</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Rate</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">
                Start Time
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300">End Time</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">
                Payment Terms
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Delivery</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">
                Interacted
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBids.map((bid) => (
              <tr key={bid._id}>
                <td className="py-2 px-4 border-b">{bid._id.slice(-4)}</td>
                <td className="py-2 px-4 border-b">{bid.buyer}</td>
                <td className="py-2 px-4 border-b">{bid.buyerPhoneNumber}</td>
                <td className="py-2 px-4 border-b">{bid.buyerLocation}</td>
                <td className="py-2 px-4 border-b">{bid.product}</td>
                <td className="py-2 px-4 border-b">{bid.quantity}</td>
                <td className="py-2 px-4 border-b">{bid.unit}</td>
                <td className="py-2 px-4 border-b">{bid.rateForBid}</td>
                <td className="py-2 px-4 border-b">{bid.date}</td>
                <td className="py-2 px-4 border-b">{bid.startTime}</td>
                <td className="py-2 px-4 border-b">{bid.endTime}</td>
                <td className="py-2 px-4 border-b">{bid.paymentTerms}</td>
                <td className="py-2 px-4 border-b">{bid.delivery}</td>
                <td className="py-2 px-4 border-b">{0}</td>
                <td className="py-2 px-4 border-b">{0}</td>
                <td className="py-4 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => handleView(bid)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    <FaRegEye title="View" />
                  </button>
                  <button
                    onClick={() => handleEdit(bid)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    <CiEdit title="Edit" />
                  </button>
                  <button
                    onClick={() => handleDelete(bid._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    <MdDeleteForever title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-500 text-white px-3 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default BidBuyerMaster;
