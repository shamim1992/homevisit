import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import moment from 'moment';

const Profile = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');
    const { currentUser} = useSelector(state => state.user)
    // console.log(user)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/users/profile/${currentUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [token]);

    if (!user) {
        return <div className='min-h-screen w-full '>Loading...</div>;
    }

    return (
        

<div className="flex">
<Sidebar /> {/* Sidebar component */}
<div className="flex-1">
    <Navbar />
    <div className="p-6">
    <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold">Profile</h2>
            <div className="mt-4">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Date of Birth:</strong> {moment(user.dateOfBirth).format('DD/MM/YYYY')}</p>
            </div>
            <div className="mt-6">
                <Link to="/user/profile/edit" className="btn btn-primary mr-2">Edit Profile</Link>
                <Link to="/user/profile/change-password" className="btn btn-secondary">Change Password</Link>
            </div>
        </div>
    </div>
</div>
</div>
    );
};

export default Profile;
