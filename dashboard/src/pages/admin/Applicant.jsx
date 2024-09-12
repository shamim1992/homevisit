import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { apiUrl } from '../../AppUrl';
import { Link, useParams } from 'react-router-dom';

const Applicant = () => {
    const [user, setUser] = useState(null); // Change to store a single user's data
    const token = localStorage.getItem('token');
    const { id } = useParams(); // Extract id from params

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/applicant/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data); // Store the user's data
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id, token]); // Use id and token as dependencies

    if (!user) {
        return <p>Loading...</p>; // Add loading state
    }

    return (
        <div className="min-h-screen flex">
            <div className='min-h-screen w-60 bg-black text-white hidden md:block'>
                <Sidebar />
            </div>
            <div className='flex-1'>
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center">Applicant Details</h2>
                    <div className="overflow-x-auto mt-4">
                        <div className="shadow-lg p-6 bg-white rounded-lg">
                            <h3><strong>Name:</strong> {user.name}</h3>
                            <h3><strong>Username:</strong> {user.username}</h3>
                            <h3><strong>Email:</strong> {user.email}</h3>
                            <h3><strong>Contact:</strong> {user.contact}</h3>
                            <h3><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</h3>
                            <h3><strong>Qualification:</strong> {user.qualification}</h3>
                            <h3><strong>Experience:</strong> {user.experience}</h3>
                            <h3><strong>Address:</strong> {user.address}</h3>
                            <h3><strong>State:</strong> {user.state}</h3>
                            <h3><strong>District:</strong> {user.district}</h3>
                            <h3><strong>City:</strong> {user.city}</h3>
                            <h3><strong>Preferred Area:</strong> {user.prefferedarea}</h3>
                            <h3><strong>Resume:</strong> <Link to={`${apiUrl}/uploads/${user.resume}`} target="_blank" rel="noopener noreferrer" className='text-blue-500'>View</Link></h3>
                            <h3><strong>Certificate:</strong> <a href={`${apiUrl}/uploads/${user.certificate}`} target="_blank" rel="noopener noreferrer" className='text-blue-500'>View</a></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Applicant;
