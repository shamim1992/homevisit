import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../../app/users/userSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        dispatch(signoutSuccess());
        navigate('/login');
    };

    return (
        <div className="navbar w-full shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl lg:hidden">ChanRe Physiotherapy</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <ul>
                                <li><Link to="/admin/users" >Manage Users</Link></li>
                                <li><Link to="/admin/orders" >Manage Orders</Link></li>
                                <li><Link to="/admin/physiotherapists" >Manage Physiotherapists</Link></li>
                                <li><Link to="/admin/services" >Manage Services</Link></li>
                                <li><Link to="/admin/assign" >Assign Orders</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Profile"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
