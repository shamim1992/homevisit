// src/components/user/Appointments.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../common/Navbar';
import axios from 'axios';
import moment from 'moment';
import Modal from '../common/Modal';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/user/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [token]);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{moment(appointment.date).format('MMMM D, YYYY')}</td>
                                        <td>{appointment.services.map(service => service.name).join(', ')}</td>
                                        <td>{appointment.status}</td>
                                        <td>
                                            <button
                                                className="bg-blue-500 text-white rounded px-4 py-2 mx-1"
                                                onClick={() => handleViewDetails(appointment)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedAppointment && (
                        <Modal title="Appointment Details" onClose={handleCloseModal}>
                            <p className="py-2"><strong>Service:</strong> {selectedAppointment.services.map(service => service.name).join(', ')}</p>
                            <p className="py-2"><strong>Date:</strong> {moment(selectedAppointment.date).format('MMMM D, YYYY')}</p>
                            <p className="py-2"><strong>Status:</strong> {selectedAppointment.status}</p>
                            <p className="py-2"><strong>Physiotherapist:</strong> {selectedAppointment.physiotherapist?.name || 'Not assigned'}</p>
                            <div className="modal-action">
                                <button className="btn" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointments;
