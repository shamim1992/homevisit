import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [physiotherapists, setPhysiotherapists] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedPhysiotherapist, setSelectedPhysiotherapist] = useState('');
    const [filterMode, setFilterMode] = useState('all'); 
    const token = localStorage.getItem('token');

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

        fetchOrders();
    }, [token]);

    const fetchAvailablePhysiotherapists = async (pinCode) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/admin/physiotherapists?pinCode=${pinCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPhysiotherapists(response.data);
        } catch (error) {
            console.error('Error fetching physiotherapists:', error);
        }
    };

    const handleDetailsClick = (order) => {
        setSelectedOrder(order);
        if (order.pinCode) {
            fetchAvailablePhysiotherapists(order.pinCode);
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setSelectedPhysiotherapist(''); // Reset the selected physiotherapist when closing the modal
    };

    const handleAssignPhysiotherapist = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:5002/api/admin/order/${selectedOrder._id}/assign`, 
                {
                    physioId: selectedPhysiotherapist  
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                setOrders(orders.map(order => 
                    order._id === selectedOrder._id ? { ...order, physiotherapist: response.data.physiotherapist } : order
                ));
                toast.success('Physiotherapist assigned successfully');
                handleCloseModal();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error assigning physiotherapist:', error);
            toast.error('Failed to assign physiotherapist. Please try again.');
        }
    };
    
    const filteredOrders = orders.filter(order => {
        if (filterMode === 'assigned') {
            return order.physiotherapist;
        } else if (filterMode === 'non-assigned') {
            return !order.physiotherapist;
        }
        return true;
    });

    return (
        <div className="min-h-screen flex">
            <ToastContainer />
            <div className='min-h-screen w-60 bg-black text-white hidden md:block'>
                <Sidebar />
            </div>

            <div className='flex-1'>
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center">Manage Orders</h2>

                    <div className="btn-group my-4">
                        <button 
                            className={`px-4 py-2 ${filterMode === 'all' ? 'bg-blue-500 text-white rounded' : ''}`}
                            onClick={() => setFilterMode('all')}
                        >
                            Show All Orders
                        </button>
                        <button 
                            className={`px-4 py-2 ${filterMode === 'assigned' ? 'bg-blue-500 text-white rounded' : ''}`}
                            onClick={() => setFilterMode('assigned')}
                        >
                            Assigned Orders
                        </button>
                        <button 
                            className={`px-4 py-2 ${filterMode === 'non-assigned' ? 'bg-blue-500 text-white rounded' : ''}`}
                            onClick={() => setFilterMode('non-assigned')}
                        >
                            Non-Assigned Orders
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Physiotherapist</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>{moment(order.createdAt).format('MMMM D, YYYY')}</td>
                                        <td>{order.user?.name}</td>
                                        <td>{order?.status}</td>
                                        <td>{order.physiotherapist?.name || 'Not Assigned'}</td>
                                        <td>
                                            <button
                                                className="bg-blue-500 text-white rounded px-4 py-2 mx-1"
                                                onClick={() => handleDetailsClick(order)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedOrder && (
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Order Details</h3>
                                <p className="py-2"><strong>Order ID:</strong> {selectedOrder._id}</p>
                                <p className="py-2"><strong>User:</strong> {selectedOrder.user?.name}</p>
                                <p className="py-2"><strong>Status:</strong> {selectedOrder.status}</p>
                                <p className="py-2"><strong>Services:</strong> {selectedOrder.services.map(service => (
                                    <span key={service._id}>{service.name}, </span>
                                ))}</p>
                                <p className="py-2"><strong>Assigned Physiotherapist:</strong> {selectedOrder.physiotherapist?.name || 'Not Assigned'}</p>
                                <p className="py-2"><strong>Session Start Time:</strong> {selectedOrder.sessionStartTime || 'Not Set'}</p>
                                <p className="py-2"><strong>Session End Time:</strong> {selectedOrder.sessionEndTime || 'Not Set'}</p>
                                
                                <div className="mb-4">
                                    <label className="label">
                                        <span className="label-text">Assign Physiotherapist</span>
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

                                <div className="modal-action">
                                    <button className="btn btn-primary" onClick={handleAssignPhysiotherapist}>
                                        Assign Physiotherapist
                                    </button>
                                    <button className="btn" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageOrdersPage;
