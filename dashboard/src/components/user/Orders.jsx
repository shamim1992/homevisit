import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import { apiUrl } from '../../AppUrl';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/orders/myorders`, {
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

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const renderSessionStatus = (session) => {
        switch (session.status) {
            case 'scheduled':
                return <span className="text-blue-500">Scheduled</span>;
            case 'in-progress':
                return <span className="text-yellow-500">In Progress</span>;
            case 'completed':
                return <span className="text-green-500">Completed</span>;
            case 'canceled':
                return <span className="text-red-500">Canceled</span>;
            default:
                return session.status;
        }
    };

    return (
        <div className="flex">
            <Sidebar /> {/* Sidebar component */}
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Booking Date</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Preffered Date</th>
                                    <th>Completed / Total Sessions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{moment(order.createdAt).format('MMMM D, YYYY')}</td>
                                        <td>{order.services.map(service => service.name).join(', ')}</td>
                                        <td>{order.status}</td>
                                        <td>{moment(order.preferredDate).format('MMMM D, YYYY')}</td>
                                        <td>{order.completedSessions} / {order.totalSessions}</td>
                                        <td>
                                            <button
                                                className="bg-blue-500 text-white rounded px-4 py-2 mx-1"
                                                onClick={() => handleViewDetails(order)}
                                            >
                                                View Details
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
                                <p className="py-2"><strong>Date:</strong> {moment(selectedOrder.createdAt).format('MMMM D, YYYY')}</p>
                                <p className="py-2"><strong>Services:</strong> {selectedOrder.services.map(service => service.name).join(', ')}</p>
                                <p className="py-2"><strong>Status:</strong> {selectedOrder.status}</p>
                                <p className="py-2"><strong>Physiotherapist:</strong> {selectedOrder.physiotherapist?.name || 'Not assigned'}</p>
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Session #</th>
                                            <th>Status</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder.sessions.map((session, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{renderSessionStatus(session)}</td>
                                                <td>{session.sessionStart ? moment(session.sessionStart).format('M-D-YY, h:mm A') : 'Not Started'}</td>
                                                <td>{session.sessionEnd ? moment(session.sessionEnd).format('M-D-YY, h:mm A') : 'Not Ended'}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="modal-action">
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

export default Orders;
