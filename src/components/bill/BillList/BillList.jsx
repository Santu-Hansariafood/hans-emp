import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DisplayBill from "../DisplayBill/DisplayBill"

const BillList = () => {
    const [bills, setBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [billsPerPage] = useState(10);

    useEffect(() => {
        axios.get('https://main-server-9oo9.onrender.com/bill')
            .then(response => {
                setBills(response.data);
                setFilteredBills(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        filterBills(e.target.value);
    }

    const filterBills = (query) => {
        setCurrentPage(1);
        const filtered = bills.filter(bill => {
            return bill.farmerName.toLowerCase().includes(query.toLowerCase()) ||
                   bill.mobileNumber.includes(query);
        });
        setFilteredBills(filtered);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

    return (
        <div className="container mx-auto">
            <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search by farmer name or mobile number"
                className="border p-2 mb-4 float-right mt-4 mr-2"
            />
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border p-2">Lorry Number</th>
                        <th className="border p-2">Farmer Name</th>
                        <th className="border p-2">Mobile Number</th>
                        <th className="border p-2">Payable Amount</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBills.map(bill => (
                        <tr key={bill._id}>
                            <td className="border p-2">{bill.lorryNumber}</td>
                            <td className="border p-2">{bill.farmerName}</td>
                            <td className="border p-2">{bill.mobileNumber}</td>
                            <td className="border p-2">{bill.payableAmount}</td>
                            <td className="border p-2">
                                <Link to={{
                                    pathname: `/display-bill/${bill._id}`,
                                    state: { billData: bill }
                                }} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">View</Link>
                                {/* Add other buttons for Edit and Delete here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center">
                {Array.from({ length: Math.ceil(filteredBills.length / billsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="px-4 py-2 mr-2 bg-gray-200">
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BillList;
