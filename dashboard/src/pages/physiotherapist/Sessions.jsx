import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/physio/Sidebar';
import Navbar from '../../components/physio/Navbar';
import axios from 'axios';
import moment from 'moment';
import Modal from '../../components/common/Modal';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/physio/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: { status: 'approved' }, 
                });
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, [token]);

    const handleViewDetails = (session) => {
        setSelectedSession(session);
    };

    const handleCloseModal = () => {
        setSelectedSession(null);
    };

    const handleStartSession = async (sessionId) => {
        try {
            const response = await axios.patch(
                `http://localhost:5002/api/physio/session/${sessionId}/start`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSessions(sessions.map(session =>
                session._id === sessionId ? { ...session, status: 'in-progress', sessionStart: response.data.sessionStart } : session
            ));
            handleCloseModal();
        } catch (error) {
            console.error('Error starting session:', error);
        }
    };

    const handleEndSession = async (sessionId) => {
        try {
            const response = await axios.patch(
                `http://localhost:5002/api/physio/session/${sessionId}/end`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSessions(sessions.map(session =>
                session._id === sessionId ? { ...session, status: 'completed', sessionEnd: response.data.sessionEnd } : session
            ));
            handleCloseModal();
        } catch (error) {
            console.error('Error ending session:', error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Approved Sessions</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Patient</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Start Session</th>
                                    <th>End Session</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map((session) => (
                                    <tr key={session._id}>
                                        <td>{moment(session.createdAt).format('MMMM D, YYYY')}</td>
                                        <td>{session.user?.name}</td>
                                        <td>{session.services.map(service => service.name).join(', ')}</td>
                                        <td>{session.status}</td>
                                        <td>{ new Date(session.sessionStart).toLocaleTimeString()}</td>
                                        <td>{ new Date(session.sessionEnd).toLocaleTimeString()}</td>
                                        <td>
                                            <button
                                                className="bg-blue-500 text-white rounded px-4 py-2 mx-1"
                                                onClick={() => handleViewDetails(session)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedSession && (
                        <Modal title="Session Details" onClose={handleCloseModal}>
                            <p className="py-2"><strong>Patient Name:</strong> {selectedSession.user.name}</p>
                            <p className="py-2"><strong>Service:</strong> {selectedSession.services.map(service => service.name).join(', ')}</p>
                            <p className="py-2"><strong>Date:</strong> {moment(selectedSession.createdAt).format('MMMM D, YYYY')}</p>
                            <p className="py-2"><strong>Status:</strong> {selectedSession.status}</p>
                            <div className="modal-action">
                                {selectedSession.status === 'approved' && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleStartSession(selectedSession._id)}
                                    >
                                        Start Session
                                    </button>
                                )}
                                {selectedSession.status === 'in-progress' && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEndSession(selectedSession._id)}
                                    >
                                        End Session
                                    </button>
                                )}
                                {/* <button className="btn" onClick={handleCloseModal}>
                                    Close
                                </button> */}
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sessions;
