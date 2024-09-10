import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaEye } from 'react-icons/fa';
import Sidebar from '../../components/physio/Sidebar';
import Navbar from '../../components/physio/Navbar';
import Modal from '../../components/common/Modal';
import { apiUrl } from '../../AppUrl';
import { toast } from 'react-toastify';

const Sessions = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [sessionToStart, setSessionToStart] = useState(null);
    const token = localStorage.getItem('token');

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${apiUrl}/api/physio/appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { status: 'approved' },
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again.');
            toast.error('Failed to fetch orders. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleSessionAction = async (orderId, sessionIndex, action) => {
        if (action === 'start') {
            setSessionToStart({ orderId, sessionIndex });
            setShowConfirmation(true);
        } else {
            await performSessionAction(orderId, sessionIndex, action);
        }
    };

    const performSessionAction = async (orderId, sessionIndex, action) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(
                `${apiUrl}/api/orders/update-session`,
                {
                    orderId,
                    sessionIndex,
                    status: action === 'start' ? 'in-progress' : 'completed',
                    sessionStart: action === 'start' ? new Date().toISOString() : undefined,
                    sessionEnd: action === 'end' ? new Date().toISOString() : undefined,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        
            if (response.data && response.data.order) {
                setOrders(prevOrders => 
                    prevOrders.map(order =>
                        order._id === orderId ? response.data.order : order
                    )
                );
                setSelectedOrder(response.data.order);
                toast.success(`Session ${action === 'start' ? 'started' : 'ended'} successfully`);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error(`Error ${action}ing session:`, error);
            setError(`Failed to ${action} session. Please try again.`);
            toast.error(`Failed to ${action} session. Please try again.`);
        } finally {
            setLoading(false);
            setShowConfirmation(false);
        }
    };

    const handleConfirmStart = () => {
        if (sessionToStart) {
            performSessionAction(sessionToStart.orderId, sessionToStart.sessionIndex, 'start');
        }
    };

    const handleCancelStart = () => {
        setShowConfirmation(false);
        setSessionToStart(null);
    };

    const renderSessionStatus = (session) => {
        switch(session.status) {
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

    if (loading && orders.length === 0) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Approved Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Booking Date</th>
                                    <th>Patient</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Completed / Total Sessions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{moment(order.createdAt).format('MMMM D, YYYY')}</td>
                                        <td>{order.user?.name}</td>
                                        <td>{order.services.map(service => service.name).join(', ')}</td>
                                        <td>{order.status}</td>
                                        <td>{order.completedSessions} / {order.totalSessions}</td>
                                        <td>
                                            <button onClick={() => handleViewDetails(order)}>
                                                <FaEye className='text-blue-500 h-5 w-5' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedOrder && (
                        <Modal title="Order Details" onClose={handleCloseModal}>
                            <p className="py-1"><strong>Patient Name:</strong> {selectedOrder.user.name}</p>
                            <p className="py-1"><strong>Patient Address:</strong> {selectedOrder.address}</p>
                            <p className="py-1"><strong>Patient Contact:</strong> {selectedOrder.mobile}</p>
                            <p><strong>Preferred Date:</strong> {moment(selectedOrder.preferredDate).format('M-D-YY')}</p>
                            <div className="py-1"><strong>Services:</strong>
                                <ul>
                                    {selectedOrder.services.map((service, index) => (
                                        <li key={index}>{service.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <h3 className="text-xl font-bold mt-4 mb-2">Sessions</h3>
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Session #</th>
                                        <th>Status</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.sessions.map((session, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{renderSessionStatus(session)}</td>
                                            <td>{session.sessionStart ? moment(session.sessionStart).format('M-D-YY, h:mm A') : 'Not Started'}</td>
                                            <td>{session.sessionEnd ? moment(session.sessionEnd).format('M-D-YY, h:mm A') : 'Not Ended'}</td>
                                            <td>
                                                {session.status === 'scheduled' && (
                                                    <button
                                                        className="text-xs px-4 py-2 bg-blue-500 text-white rounded-full"
                                                        onClick={() => handleSessionAction(selectedOrder._id, index, 'start')}
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Starting...' : 'Start'}
                                                    </button>
                                                )}
                                                {session.status === 'in-progress' && (
                                                    <button
                                                        className="text-xs px-4 py-2 bg-red-700 text-white rounded-full"
                                                        onClick={() => handleSessionAction(selectedOrder._id, index, 'end')}
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Ending...' : 'End'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Modal>
                    )}

                    {showConfirmation && (
                        <Modal title="Confirm Session Start" onClose={handleCancelStart}>
                            <p>Are you sure you want to start this session?</p>
                            <p><strong>Services to be performed:</strong></p>
                            <ul>
                                {selectedOrder.services.map((service, index) => (
                                    <li key={index}>{service.name}</li>
                                ))}
                            </ul>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-black rounded-full mr-2"
                                    onClick={handleCancelStart}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full"
                                    onClick={handleConfirmStart}
                                >
                                    Confirm Start
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sessions;