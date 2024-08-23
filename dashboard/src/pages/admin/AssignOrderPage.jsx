import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';

const AssignOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [physiotherapists, setPhysiotherapists] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedPhysiotherapist, setSelectedPhysiotherapist] = useState('');
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/admin/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchPhysiotherapists = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/admin/physiotherapists', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhysiotherapists(response.data);
            } catch (error) {
                console.error('Error fetching physiotherapists:', error);
            }
        };

        fetchOrders();
        fetchPhysiotherapists();
    }, [token]);

    const handleAssign = async () => {
        try {
            await axios.post(
                `http://localhost:5002/api/admin/assign/${selectedOrder}`,
                {
                    physioId: selectedPhysiotherapist
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Order assigned successfully!');
        } catch (error) {
            console.error('Error assigning order:', error);
            alert('Failed to assign order.');
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className='min-h-screen w-60 bg-black text-white hidden md:block'>
                <Sidebar />
            </div>
            <div className='flex-1'>
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center">Assign Orders</h2>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Select Order</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={selectedOrder}
                            onChange={(e) => setSelectedOrder(e.target.value)}
                        >
                            <option value="">Select an order</option>
                            {orders.map(order => (
                                <option key={order._id} value={order._id}>{order._id}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Select Physiotherapist</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={selectedPhysiotherapist}
                            onChange={(e) => setSelectedPhysiotherapist(e.target.value)}
                        >
                            <option value="">Select a physiotherapist</option>
                            {physiotherapists.map(physio => (
                                <option key={physio._id} value={physio._id}>{physio.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleAssign}>Assign Order</button>
                </div>
            </div>
        </div>
    );
};

export default AssignOrderPage;
