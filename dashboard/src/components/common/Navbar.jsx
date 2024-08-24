import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../../app/users/userSlice';

const Navbar = () => {
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(signoutSuccess());
        navigate('/login');
    };

    return (
        <div className="bg-gray-900 text-white flex justify-between p-4 sticky top-0">
            <div className="text-xl">Welcome, {currentUser.name}</div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Navbar;
