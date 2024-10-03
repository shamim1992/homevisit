import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../AppUrl';
import Navbar from '../../components/Home/Navbar';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false); // Track if the form has been submitted
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (submitted) return;

        setLoading(true);
        setMessage('');
        setError('');
        setSubmitted(true); // Set submitted to true

        try {
            const response = await axios.post(`${apiUrl}/api/auth/forgot-password`, { email });
            setMessage(response.data.message);

            // Redirect to login page after success
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Forgot Password</h2>
                {message && <div className="text-green-500">{message}</div>}
                {error && <div className="text-red-500">{error}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email} placeholder='Enter your email address'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading || submitted} // Disable if loading or already submitted
                    className="bg-blue-500 text-white rounded px-4 py-2"
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
        </div>
        </>
        
    );
};

export default ForgotPassword;
