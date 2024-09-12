import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signoutSuccess } from '../../app/users/userSlice'

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    console.log(currentUser)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(signoutSuccess());
        navigate('/login');
    };
    return (
        <div className="navbar bg-blue-500 text-white px-3 lg:px-24">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-blue-500 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Services</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">ChanRe Physio</a>
            </div>
            <div className="navbar-center hidden lg:flex">
               
               
                <ul className="menu menu-horizontal px-1 font-bold ">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/about'}>About Us</Link></li>
                    <li><Link to={'/service'}>Services</Link></li>
                    <li><Link to={'/apply'}>Join Us</Link></li>
                    <li><Link to={'/contact'}>Contact</Link></li>

                    {
                        currentUser && currentUser.role === 'admin'? <li><a>Admin</a></li> : null
                    }
                    {
                        currentUser && currentUser.role === 'physiotherapist'? <li><a>My Appointments</a></li> : null
                    }
                    {
                        currentUser && currentUser.role === 'user'? <li><Link to={`/user/dashboard`} className="">Dashbaord</Link></li> : null
                    }

                </ul>
            </div>
            <div className="navbar-end">
                {
                    currentUser == null ? <><Link to={'/login'} className="px-6 py-2 rounded-full bg-[#893170] font-bold cursor-pointer hover:bg-[#893170] hover:shadow-xl">Login</Link>
                        <Link to={'/register'} className="px-6 py-2 rounded-full bg-[#893170] font-bold cursor-pointer hover:bg-[#893170] hover:shadow-xl">Signup</Link></> : <a className="px-6 py-2 rounded-full bg-[#893170] font-bold cursor-pointer hover:bg-[#893170] hover:shadow-xl" onClick={handleLogout}>Logout</a>
                }

            </div>
        </div>
    )
}

export default Navbar