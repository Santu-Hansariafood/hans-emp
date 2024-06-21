import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditBid = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bid } = location.state;

    const [formData, setFormData] = useState({
        godown: bid.godown._id,  // Assuming bid.godown contains the godown object with an _id field
        quantity: bid.quantity,
        unit: bid.unit,
        rateForBid: bid.rateForBid,
        date: new Date(bid.date).toISOString().substring(0, 10),
        startTime: bid.startTime,
        endTime: bid.endTime,
        paymentTerms: bid.paymentTerms,
        delivery: bid.delivery,
    });

    const [godowns, setGodowns] = useState([]);

    useEffect(() => {
        // Fetch godowns from the API
        axios.get('http://localhost:3000/api/godowns')
            .then(response => {
                setGodowns(response.data);
            })
            .catch(error => {
                console.error('Error fetching godowns:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/api/bidsSupplier/${bid._id}`, formData);

            if (response.status === 200) {
                Swal.fire('Success', 'Bid updated successfully', 'success');
                navigate('/supplier-bid-master');
            } else {
                Swal.fire('Error', 'There was an error updating the bid', 'error');
            }
        } catch (error) {
            console.error('Error updating bid:', error);
            Swal.fire('Error', error.response?.data?.message || 'There was an error updating the bid', 'error');
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6">Edit Bid</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Godown</label>
                    <select
                        name="godown"
                        value={formData.godown}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    >
                        {godowns.map((godown) => (
                            <option key={godown._id} value={godown._id}>
                                {godown.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Unit</label>
                    <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rate</label>
                    <input
                        type="number"
                        name="rateForBid"
                        value={formData.rateForBid}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Payment Terms</label>
                    <input
                        type="text"
                        name="paymentTerms"
                        value={formData.paymentTerms}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Delivery</label>
                    <input
                        type="text"
                        name="delivery"
                        value={formData.delivery}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Bid</button>
            </form>
        </div>
    );
};

export default EditBid;
