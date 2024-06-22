import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BillList = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [billsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://main-server-2kc5.onrender.com/api/bills")
      .then((response) => {
        setBills(response.data);
        setFilteredBills(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    filterBills(e.target.value);
  };

  const filterBills = (query) => {
    setCurrentPage(1);
    const filtered = bills.filter((bill) => {
      return (
        bill.farmerName.toLowerCase().includes(query.toLowerCase()) ||
        bill.mobileNumber.includes(query)
      );
    });
    setFilteredBills(filtered);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const handleDelete = (billId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://main-server-2kc5.onrender.com/api/bills/${billId}`)
          .then((response) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setBills(bills.filter((bill) => bill._id !== billId));
            setFilteredBills(
              filteredBills.filter((bill) => bill._id !== billId)
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the bill.",
              "error"
            );
          });
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-end mt-4 mr-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search by farmer name or mobile number"
          className="border p-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border p-2">Bill No</th>
              <th className="border p-2">Lorry Number</th>
              <th className="border p-2">Farmer Name</th>
              <th className="border p-2">Mobile Number</th>
              <th className="border p-2">Payable Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBills.map((bill) => (
              <tr key={bill._id}>
                <td className="border p-2">{bill.billNumber}</td>
                <td className="border p-2">{bill.lorryNumber}</td>
                <td className="border p-2">{bill.farmerName}</td>
                <td className="border p-2">{bill.mobileNumber}</td>
                <td className="border p-2">{bill.payableAmount}</td>
                <td className="border p-2">
                  <div className="flex space-x-2">
                    <Link
                      to={{
                        pathname: `/display-bill-list/${bill._id}`,
                        state: { billData: bill },
                      }}
                      className="px-2 py-2 bg-blue-500 text-white rounded flex items-center justify-center"
                    >
                      <FaRegEye title="View" />
                    </Link>
                    <Link
                      to={{
                        pathname: `/edit-bill/${bill._id}`,
                        state: { billData: bill },
                      }}
                      className="px-2 py-2 bg-yellow-500 text-white rounded flex items-center justify-center"
                    >
                      <FaEdit title="Edit" />
                    </Link>
                    <button
                      onClick={() => handleDelete(bill._id)}
                      className="px-2 py-2 bg-red-500 text-white rounded flex items-center justify-center"
                    >
                      <FaTrash title="Delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({
          length: Math.ceil(filteredBills.length / billsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className="px-4 py-2 mr-2 bg-gray-200"
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BillList;
