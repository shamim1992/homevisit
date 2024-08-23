import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
const ManageServicesPage = () => {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [serviceData, setServiceData] = useState({ name: '', price: '', description: '' });

    // Fetch token from localStorage
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

    const deleteService = async (id) => {
        try {
            await axios.delete(`http://localhost:5002/api/services/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServices(services.filter(service => service._id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const startEdit = (service) => {
        setEditingService(service._id);
        setServiceData({ name: service.name, price: service.price, description: service.description });
    };

    const cancelEdit = () => {
        setEditingService(null);
        setServiceData({ name: '', price: '', description: '' });
    };

    const handleInputChange = (e) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };
    
    const saveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:5002/api/services/${id}`, serviceData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServices(services.map(service => service._id === id ? { ...service, ...serviceData } : service));
            cancelEdit();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };
    return (
        <div className="min-h-screen flex">
            <div className='min-h-screen w-60 bg-black text-white hidden md:block'>
                <Sidebar />
            </div>
            <div className='flex-1'>
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center">Manage Services</h2>
                    <div className="overflow-x-auto">
                        <table className="table shadow-md">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map(service => (
                                    <tr key={service._id}>
                                        <td>
                                            {editingService === service._id ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={serviceData.name}
                                                    onChange={handleInputChange}
                                                    className="input input-bordered w-full"
                                                />
                                            ) : (
                                                service.name
                                            )}
                                        </td>
                                        <td>
                                            {editingService === service._id ? (
                                                <input
                                                    type="text"
                                                    name="price"
                                                    value={serviceData.price}
                                                    onChange={handleInputChange}
                                                    className="input input-bordered w-full"
                                                />
                                            ) : (
                                                service.price
                                            )}
                                        </td>
                                        <td>
                                            {editingService === service._id ? (
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={serviceData.description}
                                                    onChange={handleInputChange}
                                                    className="input input-bordered w-full"
                                                />
                                            ) : (
                                                service.description
                                            )}
                                        </td>
                                        <td>
                                            {editingService === service._id ? (
                                                <>
                                                    <button
                                                        onClick={() => saveEdit(service._id)}
                                                        className="text-green-500 mx-1"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="text-yellow-500 mx-1"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => startEdit(service)}
                                                        className="text-blue-500 mx-1"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteService(service._id)}
                                                        className="text-red-500 mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageServicesPage;
