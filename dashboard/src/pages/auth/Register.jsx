import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        address: '',
        phone: '',
        dateOfBirth: '',
        state: '',
        district: '',
        city: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/api/auth/register', formData);
            console.log('Registration successful:', response.data);
            
            // Clear all fields
            setFormData({
                name: '',
                email: '',
                password: '',
                username: '',
                address: '',
                phone: '',
                dateOfBirth: '',
                state: '',
                district: '',
                city: ''
            });
            
            // Show alert
            alert('Registration successful!');
        } catch (err) {
            console.error('Registration error:', err);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Create an account to access all our amazing features.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-md bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={handleChange}
                                required autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="input input-bordered"
                                value={formData.username}
                                onChange={handleChange}
                                required autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered"
                                value={formData.password}
                                onChange={handleChange}
                                required autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="input input-bordered"
                                value={formData.address}
                                onChange={handleChange} autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                className="input input-bordered"
                                value={formData.phone}
                                onChange={handleChange} autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date of Birth</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="input input-bordered"
                                value={formData.dateOfBirth}
                                onChange={handleChange} autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">State</span>
                            </label>
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                className="input input-bordered"
                                value={formData.state}
                                onChange={handleChange} autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            <input
                                type="text"
                                name="district"
                                placeholder="District"
                                className="input input-bordered"
                                value={formData.district}
                                onChange={handleChange} autoComplete='false'
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="input input-bordered"
                                value={formData.city}
                                onChange={handleChange} autoComplete='false'
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;