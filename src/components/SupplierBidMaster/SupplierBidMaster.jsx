import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SupplierBidMaster = () => {
  const [bids, setBids] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bidsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = () => {
    axios
      .get("https://main-server-2kc5.onrender.com/api/bidsSupplier")
      .then((response) => {
        setBids(
          response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
      });
  };

  const handleEdit = (bid) => {
    navigate(`/edit-bid/${bid._id}`, { state: { bid } });
  };

  const handleView = (bid) => {
    Swal.fire({
      title: "Bid Details",
      html: `
        <table class="table-auto w-full text-left">
          <tr><th class="border px-4 py-2">Godown</th><td class="border px-4 py-2">${
            bid.godown?.name || "N/A"
          }</td></tr>
          <tr><th class="border px-4 py-2">Quantity</th><td class="border px-4 py-2">${
            bid.quantity
          }</td></tr>
          <tr><th class="border px-4 py-2">Unit</th><td class="border px-4 py-2">${
            bid.unit
          }</td></tr>
          <tr><th class="border px-4 py-2">Rate</th><td class="border px-4 py-2">${
            bid.rateForBid
          }</td></tr>
          <tr><th class="border px-4 py-2">Date</th><td class="border px-4 py-2">${new Date(
            bid.date
          ).toLocaleDateString()}</td></tr>
          <tr><th class="border px-4 py-2">Start Time</th><td class="border px-4 py-2">${
            bid.startTime
          }</td></tr>
          <tr><th class="border px-4 py-2">End Time</th><td class="border px-4 py-2">${
            bid.endTime
          }</td></tr>
          <tr><th class="border px-4 py-2">Payment Terms</th><td class="border px-4 py-2">${
            bid.paymentTerms
          }</td></tr>
          <tr><th class="border px-4 py-2">Delivery</th><td class="border px-4 py-2">${
            bid.delivery
          }</td></tr>
        </table>
      `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  const handleDelete = (bidId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this bid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://main-server-2kc5.onrender.com/api/bidsSupplier/${bidId}`
          )
          .then(() => {
            Swal.fire("Deleted!", "The bid has been deleted.", "success");
            fetchBids();
          })
          .catch((error) => {
            console.error("Error deleting bid:", error);
            Swal.fire("Error", "There was an error deleting the bid.", "error");
          });
      }
    });
  };

  const handlePlaceBid = (bid) => {
    navigate(`/place-bid`, { state: { bid } });
  };

  const indexOfLastBid = currentPage * bidsPerPage;
  const indexOfFirstBid = indexOfLastBid - bidsPerPage;
  const currentBids = bids.slice(indexOfFirstBid, indexOfLastBid);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Supplier Bid Master</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-green-400 to-yellow-500 text-white">
              <th className="px-4 py-2">Godown</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Payment Terms</th>
              <th className="px-4 py-2">Delivery</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Place Bid</th>
            </tr>
          </thead>
          <tbody>
            {currentBids.map((bid) => (
              <tr key={bid._id}>
                <td className="border px-4 py-2">
                  {bid.godown?.name || "N/A"}
                </td>
                <td className="border px-4 py-2">{bid.quantity}</td>
                <td className="border px-4 py-2">{bid.unit}</td>
                <td className="border px-4 py-2">{bid.rateForBid}</td>
                <td className="border px-4 py-2">
                  {new Date(bid.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{bid.startTime}</td>
                <td className="border px-4 py-2">{bid.endTime}</td>
                <td className="border px-4 py-2">{bid.paymentTerms}</td>
                <td className="border px-4 py-2">{bid.delivery}</td>
                <td className="border px-4 py-2">
                  <div className="flex">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleView(bid)}
                    >
                      <FaEye title="View" />
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(bid)}
                    >
                      <FaEdit title="Edit" />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(bid._id)}
                    >
                      <MdDelete title="Delete" />
                    </button>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handlePlaceBid(bid)}
                  >
                    Place Bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            indexOfLastBid >= bids.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBid >= bids.length}
        >
          Next
        </button>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button onClick={() => navigate("/work-details")}>
          <FaHome title="Back to dashboard" />
        </button>
      </div>
    </div>
  );
};

export default SupplierBidMaster;
