import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="bg-gray-900 text-white flex justify-between p-4">
            <div className="text-xl">Welcome, {currentUser.name}</div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Navbar;
