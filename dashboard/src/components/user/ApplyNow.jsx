import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../../components/Home/Navbar';
import { apiUrl } from '../../AppUrl';

const ApplyNow = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        contact: '',
        email: '',
        dob: '',
        qualification: '',
        experience: '',
        address: '',
        state: '',
        district: '',
        city: '',
        prefferedarea: ''
    });

    const [resume, setResume] = useState(null);
    const [certificate, setCertificate] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'resume') {
            setResume(files[0]);
        } else if (name === 'certificate') {
            setCertificate(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        
        console.log("Form Data before sending:", formData);
        
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        if (resume) {
            formDataToSend.append('resume', resume);
        }
        if (certificate) {
            formDataToSend.append('certificate', certificate);
        }

       

        try {

            const response = await axios.post(`${apiUrl}/api/physio/create`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Application successful:', response.data);

            
           
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response) {
                console.error('Error response:', err.response.data);
                console.error('Error status:', err.response.status);
            }
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <div className="flex flex-col lg:flex-row items-center justify-around lg:px-24 py-10">
                    <div className="text-center lg:text-left flex-1">
                        <h1 className="text-5xl font-bold">Apply Now</h1>
                        <p className="py-6">Create an account to access all our amazing features.</p>
                    </div>
                    <div className="card flex-1 w-full lg:max-w-4xl shadow-md bg-base-100">
                        <div>
                            <h1 className='text-5xl font-bold text-center'>Join Us</h1>

                        </div>
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className='flex flex-col lg:flex-row gap-6 items-center'>
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="input input-bordered"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="input input-bordered"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Contact"
                                    className="input input-bordered"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    className="input input-bordered"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-col lg:flex-row gap-6 items-center'>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Date of Birth</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        className="input input-bordered"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-6 items-center'>
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        className="input input-bordered"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        name="district"
                                        placeholder="District"
                                        className="input input-bordered"
                                        value={formData.district}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="input input-bordered"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    name="qualification"
                                    placeholder="Qualification"
                                    className="input input-bordered"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    name="experience"
                                    placeholder="Experience"
                                    className="input input-bordered"
                                    value={formData.experience}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Resume</span>
                                </label>
                                <input
                                    type="file"
                                    name="resume"
                                    className="input-bordered"
                                    onChange={handleFileChange}
                                    
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Certificate</span>
                                </label>
                                <input
                                    type="file"
                                    name="certificate"
                                    className="input-bordered"
                                    onChange={handleFileChange}
                                   
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Preferred Area Pincode (Put comma after every pincode)</span>
                                </label>
                                <input
                                    type="text"
                                    name="prefferedarea"
                                    className="input input-bordered"
                                    value={formData.prefferedarea}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplyNow;