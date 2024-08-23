import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="/user/orders" className="hover:text-gray-300">Orders</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/user/profile" className="hover:text-gray-300">Profile</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/user/dashboard" className="hover:text-gray-300">Dashboard Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
