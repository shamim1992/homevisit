import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signInFailure, signInStart, signInSuccess } from '../../app/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Home/Navbar';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state)=> state.user.currentUser)
    console.log("current user ===", currentUser)

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === 'admin') {
                navigate('/admin');
            } else if (currentUser.role === 'user') {
                navigate('/user/dashboard');
            } else if (currentUser.role === 'physiotherapist') {
                navigate('/physio');
            }
        }
    }, [currentUser, navigate]);

    // const { user, token } = response.data;
    // Store the token in localStorage
    // localStorage.setItem('token', token);
    
   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    dispatch(signInStart());

    try {
        const response = await axios.post('http://localhost:5002/api/auth/login', {
            username,
            password
        });

        console.log('Login successful:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token );

        dispatch(signInSuccess(response.data)); // Ensure this matches the API response
    } catch (err) {
        setError('Login failed. Please check your credentials.');
        console.error('Login error:', err);
        dispatch(signInFailure(err.response?.data || 'Login failed'));
    }
};


    return (
        <>
        <Navbar/>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign in now!</h1>
                    <p className="py-6">Welcome back! Please sign in to access your account and explore our amazing features.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-md bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        {error && <div className="alert alert-error">{error}</div>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="input input-bordered"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
        
    )
}

export default Login;