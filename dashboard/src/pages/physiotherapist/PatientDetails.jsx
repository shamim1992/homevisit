import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/physio/Sidebar';
import Navbar from '../../components/physio/Navbar';
import axios from 'axios';
import moment from 'moment';

const PatientDetails = () => {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [sessions, setSessions] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/physio/patient/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };

        const fetchPatientSessions = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/physio/patient/${patientId}/sessions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching patient sessions:', error);
            }
        };

        fetchPatientDetails();
        fetchPatientSessions();
    }, [patientId, token]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    {patient ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
                            <div className="mb-4">
                                <p className="py-2"><strong>Name:</strong> {patient.name}</p>
                                <p className="py-2"><strong>Age:</strong> {patient.age}</p>
                                <p className="py-2"><strong>Email:</strong> {patient.email}</p>
                                <p className="py-2"><strong>Phone:</strong> {patient.phone}</p>
                                <p className="py-2"><strong>Address:</strong> {patient.address}</p>
                                <p className="py-2"><strong>Medical History:</strong> {patient.medicalHistory}</p>
                            </div>

                            <h3 className="text-xl font-bold mb-4">Sessions</h3>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Service</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sessions.map((session) => (
                                            <tr key={session._id}>
                                                <td>{moment(session.date).format('MMMM D, YYYY')}</td>
                                                <td>{session.service.name}</td>
                                                <td>{session.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <p>Loading patient details...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
