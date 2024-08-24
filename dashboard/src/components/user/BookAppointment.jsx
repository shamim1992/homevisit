import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: '',
        pin: '',
        preferredDate: '',  
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/services', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, [token]);

    const handleCheckboxChange = (serviceId) => {
        setSelectedServices(prevSelected => 
            prevSelected.includes(serviceId)
                ? prevSelected.filter(id => id !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const appointmentData = {
            ...formData,
            services: selectedServices,
        };

        try {
            await axios.post('http://localhost:5002/api/orders', appointmentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment.');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 mx-auto">Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contact</span>
                    </label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">PIN</span>
                    </label>
                    <input
                        type="text"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Preferred Date</span>
                    </label>
                    <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>

                <h3 className="font-bold my-2">Select Services</h3>
                <div className="form-control mt-4 flex flex-row flex-wrap gap-3">
                    
                    {services.map(service => (
                        <div key={service._id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={service._id}
                                onChange={() => handleCheckboxChange(service._id)}
                                className="checkbox"
                            />
                            <label htmlFor={service._id} className="ml-2">{service.name}</label>
                        </div>
                    ))}
                </div>

                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Book Appointment</button>
                </div>
            </form>
        </div>
    );
};

export default BookAppointment;
