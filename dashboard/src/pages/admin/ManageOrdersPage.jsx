import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../../AppUrl';

const ManageOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [physiotherapists, setPhysiotherapists] = useState([]);
    const [services, setServices] = useState([]); // List of available services
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]); // Track selected services for an order
    const [selectedPhysiotherapist, setSelectedPhysiotherapist] = useState('');
    const [totalSessions, setTotalSessions] = useState('');
    const [totalAmount, setTotalAmount] = useState(0); // Track total amount
    const [filterMode, setFilterMode] = useState('all');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchAllPhysiotherapists = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/physiotherapists`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhysiotherapists(response.data);
            } catch (error) {
                console.error('Error fetching physiotherapists:', error);
            }
        };

        const fetchAllServices = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/services`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchAllPhysiotherapists();
        fetchOrders();
        fetchAllServices();
    }, [token]);

    const handleDetailsClick = (order) => {
        setSelectedOrder(order);
        setSelectedPhysiotherapist('');
        setTotalSessions('');
        setSelectedServices(order.services); // Set current order's services
        setTotalAmount(order.totalAmount || 0); // Set current order's total amount
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setSelectedPhysiotherapist('');
        setTotalSessions('');
        setSelectedServices([]); // Reset services when modal is closed
        setTotalAmount(0); // Reset total amount when modal is closed
    };

    const handleAssignPhysiotherapist = async () => {
        if (!totalSessions || totalSessions <= 0) {
            toast.error('Please enter a valid number of sessions');
            return;
        }

        try {
            const response = await axios.patch(
                `${apiUrl}/api/admin/order/${selectedOrder._id}/assign`,
                {
                    physioId: selectedPhysiotherapist,
                    totalSessions,
                    services: selectedServices, // Update selected services
                    totalAmount, // Update total amount
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setOrders(orders.map(order =>
                    order._id === selectedOrder._id ? { ...order, physiotherapist: response.data.physiotherapist, services: response.data.services, totalAmount: response.data.totalAmount } : order
                ));
                toast.success('Order updated successfully');
                handleCloseModal();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Failed to update order. Please try again.');
        }
    };

    const handleServiceChange = (e, service) => {
        if (e.target.checked) {
            setSelectedServices([...selectedServices, service]);
            setTotalAmount(totalAmount + service.price); // Increase total amount
        } else {
            setSelectedServices(selectedServices.filter(s => s._id !== service._id));
            setTotalAmount(totalAmount - service.price); // Decrease total amount
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filterMode === 'assigned') {
            return order.status !== 'pending';
        } else if (filterMode === 'pending') {
            return order.status === 'pending';
        }
        return true;
    });

    const availablePhysiotherapists = selectedOrder
        ? physiotherapists.filter(physio =>
            physio.serviceAreas && physio.serviceAreas.includes(selectedOrder.pin)
        )
        : [];

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

                    {/* Filter Buttons */}
                    <div className="btn-group my-4">
                        <button
                            className={`px-4 py-2 ${filterMode === 'all' ? 'bg-blue-500 text-white rounded' : ''}`}
                            onClick={() => setFilterMode('all')}
                        >
                            Show All Orders
                        </button>
                        <button
                            className={`px-4 py-2 ${filterMode === 'pending' ? 'bg-blue-500 text-white rounded' : ''}`}
                            onClick={() => setFilterMode('pending')}
                        >
                            Pending Orders
                        </button>
                        <button
                            className={`px-4 py-2 ${filterMode === 'assigned' ? 'bg-blue-500 text-white rounded' : ''}`}
                            onClick={() => setFilterMode('assigned')}
                        >
                            Assigned Orders
                        </button>
                    </div>

                    {/* Orders Table */}
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Patient Name</th>
                                    <th>Status</th>
                                    <th>Sessions</th>
                                    <th>Physiotherapist</th>
                                    <th>Total Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>{moment(order.createdAt).format('MMMM D, YYYY')}</td>
                                        <td>{order.user?.name}</td>
                                        <td className={order.status === 'pending' ? 'text-yellow-500 font-bold' : ''}>
                                            {order.status}
                                        </td>
                                        <td>{order.completedSessions} / {order.totalSessions}</td>
                                        <td>{order.physiotherapist?.name || 'Not Assigned'}</td>
                                        <td>{order.totalAmount}</td>
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
                    {/* Modal for Editing Order */}
                    {selectedOrder && (
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Order Details</h3>
                                <p className="py-1"><strong>Order ID:</strong> {selectedOrder._id}</p>
                                <p className="py-1"><strong>Patient Name: </strong> {selectedOrder.user?.name}</p>
                                <p className="py-1"><strong>Status: </strong> {selectedOrder.status}</p>
                                <p className="py-1"><strong>Assigned Physiotherapist:</strong> {selectedOrder.physiotherapist?.name || 'Not Assigned'}</p>

                                {/* Service Selection */}
                                <div className="mb-4">
                                    <label className="label">
                                        <span className="label-text">Add or Remove Services</span>
                                    </label>
                                    <div className="grid grid-cols-2">
                                        {services.map(service => (
                                            <div key={service._id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedServices.some(s => s._id === service._id)}
                                                    onChange={(e) => handleServiceChange(e, service)}
                                                />
                                                <span className="ml-2">{service.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Total Amount */}
                                <div className="mb-4">
                                    <label className="label">
                                        <span className="label-text">Total Amount</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full"
                                        value={totalAmount}
                                        onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                                        
                                    />
                                </div>
                                {/* Physiotherapist Selection */}
                                <div className="mb-4">
                                    <label className="label">
                                        <span className="label-text">Assign Physiotherapist</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedPhysiotherapist}
                                        onChange={(e) => setSelectedPhysiotherapist(e.target.value)}
                                    >
                                        <option value="">Select Physiotherapist</option>
                                        {availablePhysiotherapists.map(physio => (
                                            <option key={physio._id} value={physio._id}>
                                                {physio.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Total Sessions Input */}
                                <div className="mb-4">
                                    <label className="label">
                                        <span className="label-text">Total Sessions</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full"
                                        value={totalSessions}
                                        onChange={(e) => setTotalSessions(e.target.value)}
                                    />
                                </div>

                                <div className="modal-action">
                                    <button
                                        className="btn btn-success"
                                        onClick={handleAssignPhysiotherapist}
                                        disabled={!selectedPhysiotherapist || totalSessions <= 0 || selectedServices.length === 0}
                                    >
                                        Save Changes
                                    </button>
                                    <button className="btn" onClick={handleCloseModal}>Cancel</button>
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
