import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../../app/users/userSlice';

const Navbar = () => {
    const navigate = useNavigate();
const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user');  
        dispatch(signoutSuccess());
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl">Physio Dashboard</div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
