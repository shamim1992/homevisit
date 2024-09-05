import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../AppUrl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceAreaPins, setServiceAreaPins] = useState([]);
    const [prescription, setPrescription] = useState(null);

    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pin: '',
        preferredDate: '',
        mobile: '',
        referredDoctor: '', // New field for referred doctor
    });

    if (currentUser == null) {
        navigate('/login');
    }

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchServicesAndPins = async () => {
            try {
                const [servicesResponse, pinsResponse] = await Promise.all([
                    axios.get(`${apiUrl}/api/services`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get(`${apiUrl}/api/orders/service-areas`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);
                setServices(servicesResponse.data);
                setServiceAreaPins(pinsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchServicesAndPins();
    }, [token]);

    const handleCheckboxChange = (serviceId) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(serviceId)
                ? prevSelected.filter((id) => id !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setPrescription(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!serviceAreaPins.includes(formData.pin)) {
            alert('Currently, we do not provide service to your location, but we are coming to your area soon.');
            return;
        }
    
        const formDataObj = new FormData();
        formDataObj.append('patientname', formData.name);
        formDataObj.append('address', formData.address);
        formDataObj.append('pin', formData.pin);
        formDataObj.append('preferredDate', formData.preferredDate);
        formDataObj.append('mobile', formData.mobile);
        formDataObj.append('referredDoctor', formData.referredDoctor);
        formDataObj.append('prescription', prescription); 
        selectedServices.forEach(service => {
            formDataObj.append('services', service);
        });
    
        try {
            
            await axios.post(`${apiUrl}/api/orders`, formDataObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for file upload
                },
            });
            alert('Appointment booked successfully!');
            setFormData({
                name: '',
                address: '',
                pin: '',
                preferredDate: '',
                mobile: '',
                referredDoctor: '', 
                prescription: null,
            })
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment.');
        }
    };
    

    return (
        <div className="p-6 max-w-xl mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4 mx-auto text-center">Book an Appointment</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        placeholder="Enter patient name"
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
                        placeholder="Enter address"
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
                        placeholder="Enter your area PIN"
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Mobile</span>
                    </label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                        placeholder="Enter Mobile Number"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Referred Doctor (optional)</span>
                    </label>
                    <input
                        type="text"
                        name="referredDoctor"
                        value={formData.referredDoctor}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="Enter referred doctor's name"
                    />
                </div>
                <div className="form-control py-5">
                    <label className="label">
                        <span className="label-text">Upload Prescription (optional)</span>
                    </label>
                    <input
                        type="file"
                        name="prescription"
                        onChange={handleFileChange}
                        className=""
                    />
                </div>

                <h3 className="font-bold my-2">Select Services</h3>
                <div className="form-control mt-4 flex flex-row flex-wrap gap-3">
                    {services.map((service) => (
                        <div key={service._id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={service._id}
                                onChange={() => handleCheckboxChange(service._id)}
                                className="checkbox"
                            />
                            <label htmlFor={service._id} className="ml-2">
                                {service.name}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        Book Appointment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookAppointment;
