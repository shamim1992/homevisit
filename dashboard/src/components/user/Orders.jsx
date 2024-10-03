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

    // Render session status
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

    // Function to initiate payment
    const handlePayment = async (order) => {
        try {
            const response = await axios.post(`${apiUrl}/api/payment/initiate`, 
            { totalAmount: order.totalAmount, orderId: order._id }, 
            { headers: { Authorization: `Bearer ${token}` } });

            const { order: razorpayOrder } = response.data;

            // Razorpay options
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
                amount: razorpayOrder.amount,
                currency: 'INR',
                name: 'Physiotherapy Service',
                description: `Payment for Order ID: ${order._id}`,
                order_id: razorpayOrder.id,
                handler: async (response) => {
                    // Handle successful payment here
                    const paymentData = {
                        order_id: razorpayOrder.id,
                        payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    // Send payment verification data to backend
                    await axios.post(`${apiUrl}/api/payment/verify`, paymentData, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // Fetch updated orders after payment
                    const updatedOrders = await axios.get(`${apiUrl}/api/orders/myorders`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setOrders(updatedOrders.data);
                    setSelectedOrder(null);
                },
                prefill: {
                    name: order.patientname,
                    email: '', // If you have the user's email
                    contact: order.mobile,
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
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
                                    <th>Preferred Date</th>
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

                                {/* Payment Section */}
                                {selectedOrder.paymentStatus === 'pending' && (
                                    <button
                                        className="bg-green-500 text-white rounded px-4 py-2 mt-4"
                                        onClick={() => handlePayment(selectedOrder)}
                                    >
                                        Pay Now ({selectedOrder.totalAmount} INR)
                                    </button>
                                )}

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
