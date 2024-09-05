import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/physio/Sidebar';
import Navbar from '../../components/physio/Navbar';
import axios from 'axios';
import moment from 'moment';
import Modal from '../../components/common/Modal';
import { FaEye } from 'react-icons/fa';
import { apiUrl } from '../../AppUrl';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const token = localStorage.getItem('token');

    console.log(selectedSession)

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/physio/appointments`, {
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
                `${apiUrl}/api/physio/session/${sessionId}/start`,
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
                `${apiUrl}/api/physio/session/${sessionId}/end`,
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
                                        <td>{session.sessionStart? moment(session.sessionStart).format('M-D-YY,h:mm A'):'Not Set'}</td>
                                        <td>{session.sessionEnd? moment(session.sessionEnd).format('M-D-YY,h:mm A'): 'Not Set'}</td>
                                        <td>
                                            <button
                                                className=""
                                                onClick={() => handleViewDetails(session)}
                                            >
                                               <FaEye className='text-blue-500 h-5 w-5'/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedSession && (
                        <Modal title="Session Details" onClose={handleCloseModal}>
                            <p className="py-1"><strong>Patient Name:</strong> {selectedSession.user.name}</p>
                            {
                               selectedSession.status === 'completed' ? '': <><p className="py-1"><strong>Patient Address:</strong> {selectedSession.address}</p>
                            <p className="py-1"><strong>Patient Contact:</strong> {selectedSession.mobile}</p></>
                            }
                            
                            <div className="py-1"><strong>Services:</strong> 
                            <ul>
                                {selectedSession.services.map((service, index) => (
                                    <li key={index}>{service.name}</li>
                                ))}
                            </ul>
                            </div>
                            <p className="py-1"><strong>Session Date:</strong> {moment(selectedSession.preferredDate).format('D MMMM,YYYY')}</p>
                            <p className="py-1"><strong>Status:</strong> {selectedSession.status}</p>
                            <p className="py-1"><strong>Physiotherapist:</strong> {selectedSession.physiotherapist.name}</p>
                            <div className="py-1"><strong>Prescription:</strong> <a href={selectedSession.prescription != null ? apiUrl+'/uploads/'+selectedSession.prescription : '#'} target='_blank' className='text-blue-500'>View</a></div>
                            <p className="py-1"><strong>Session Start:</strong> {selectedSession.sessionStart? moment(selectedSession.sessionStart).format('M-D-YY, h:mm A'):'Not Set'}</p>
                            <p className="py-1"><strong>Session End:</strong> {selectedSession.sessionEnd? moment(selectedSession.sessionEnd).format('M-D-YY,h:mm A'): 'Not Set'}</p>

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
