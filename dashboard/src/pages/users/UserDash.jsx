
// src/pages/UserDashboard.jsx
import React from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import BookAppointment from '../../components/user/BookAppointment';


const UserDash = () => {
    return (
        <div className="flex">
        <Sidebar />
        <div className="flex-1">
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
                <BookAppointment />
            </div>
        </div>
    </div>
    );
};

export default UserDash;
