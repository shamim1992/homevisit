import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/physio/Sidebar';
import Navbar from '../../components/physio/Navbar';
import axios from 'axios';
import moment from 'moment';
import { FaEye } from "react-icons/fa";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const token = localStorage.getItem('token');
console.log(selectedAppointment)
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/physio/appointments', {
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

    const handleViewDetails = (item) => {
        setSelectedAppointment(item);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    const updateAppointmentStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5002/api/physio/order/${id}/approve`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Update the local state after successful update
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === id ? { ...appointment, status } : appointment
                )
            );
            handleCloseModal();
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Appointments</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Booking Date</th>
                                    <th>Patient</th>
                                    <th>Status</th>
                                    <th>Session Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((item) => (
                                    <tr key={item._id}>
                                        <td>{moment(item.createdAt).format('M/D/YYYY')}</td>
                                        <td>{item.user?.name}</td>
                                        <td>{item.status || 'Pending'}</td>
                                        <td>{moment(item.preferredDate).format('MM/D/YYYY')}</td>
                                        <td>
                                            <button
                                                className=""
                                                onClick={() => handleViewDetails(item)}
                                            >
                                                <FaEye className='text-blue-500 h-5 w-5  drop-shadow-2xl hover:text-blue-800'/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedAppointment && (
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Appointment Details</h3>
                                <p className="py-1"><strong>Patient Name:</strong> {selectedAppointment.user.name}</p>
                                <p className="py-1"><strong>Patient Address:</strong> {selectedAppointment.address}</p>
                                <div className="py-1"><strong>Service:</strong>
                                    <ul className='pl-10'>
                                        {selectedAppointment.services.map((service, index) => (
                                            <li key={index}>{service.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="py-1"><strong>Preffered Date:</strong> {moment(selectedAppointment.preferredDate).format('MMMM D, YYYY')}</p>
                                <p className="py-1"><strong>Status:</strong> {selectedAppointment.status}</p>
                                <p className="py-1"><strong>Physiotherapist:</strong> {selectedAppointment.physiotherapist.name}</p>

                                <div className="modal-action">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => updateAppointmentStatus(selectedAppointment._id, 'approved')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => updateAppointmentStatus(selectedAppointment._id, 'disapproved')}
                                    >
                                        Disapprove
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

export default Appointments;
