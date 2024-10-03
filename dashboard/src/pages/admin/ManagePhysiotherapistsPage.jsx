import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { apiUrl } from '../../AppUrl';

const ManagePhysiotherapistsPage = () => {
    const [physiotherapists, setPhysiotherapists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPhysio, setCurrentPhysio] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [serviceAreas, setServiceAreas] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPhysiotherapists = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/physiotherapists`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhysiotherapists(response.data);
            } catch (error) {
                console.error('Error fetching physiotherapists:', error);
            }
        };

        fetchPhysiotherapists();
    }, [token]);

    const handleAddPhysio = () => {
        setCurrentPhysio(null);
        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setPhone('');
        setAddress('');
        setDateOfBirth('');
        setServiceAreas('');
        setState('');
        setDistrict('');
        setCity('');
        setShowModal(true);
    };

    const handleEditPhysio = (physio) => {
        setCurrentPhysio(physio);
        setName(physio.name);
        setEmail(physio.email);
        setUsername(physio.username);
        setPassword(''); // For security reasons, don't pre-fill the password
        setPhone(physio.phone);
        setAddress(physio.address || '');
        setDateOfBirth(physio.dateOfBirth || '');
        setServiceAreas(physio.serviceAreas.join(', '));
        setState(physio.state || '');
        setDistrict(physio.district || '');
        setCity(physio.city || '');
        setShowModal(true);
    };

    const handleDeletePhysio = async (id) => {
        if (window.confirm('Are you sure you want to delete this physiotherapist?')) {
            try {
                await axios.delete(`${apiUrl}/api/admin/physiotherapists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhysiotherapists(physiotherapists.filter((physio) => physio._id !== id));
            } catch (error) {
                console.error('Error deleting physiotherapist:', error);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const serviceAreasArray = serviceAreas.split(',').map(area => area.trim());

            if (currentPhysio) {
                // Update existing physiotherapist
                await axios.put(`${apiUrl}/api/admin/physiotherapists/${currentPhysio._id}`, {
                    name, email, username, phone, address, dateOfBirth, serviceAreas: serviceAreasArray, state, district, city
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                // Add new physiotherapist
                const response = await axios.post(`${apiUrl}/api/admin/physiotherapists`, {
                    name, email, username, password, phone, address, dateOfBirth, serviceAreas: serviceAreasArray, state, district, city
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhysiotherapists([...physiotherapists, response.data.physiotherapist]);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error saving physiotherapist:', error);
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
                    <h2 className="text-2xl font-bold text-center">Manage Physiotherapists</h2>
                    <button className="bg-blue-500 px-4 py-2 rounded-full text-white font-semibold shadow-md hover:shadow-xl mb-4" onClick={handleAddPhysio}>Add Physiotherapist</button>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {physiotherapists.map(physio => (
                                    <tr key={physio._id}>
                                        <td>{physio.name}</td>
                                        <td>{physio.email}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditPhysio(physio)}>Edit</button>
                                            <button className="btn btn-error btn-sm mx-1" onClick={() => handleDeletePhysio(physio._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showModal && (
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">{currentPhysio ? 'Edit Physiotherapist' : 'Add Physiotherapist'}</h3>
                                <div className="py-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="input input-bordered w-full mb-2"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="input input-bordered w-full mb-2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="input input-bordered w-full mb-2"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="input input-bordered w-full mb-2"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        className="input input-bordered w-full mb-2"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="input input-bordered w-full mb-2"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        placeholder="Date of Birth"
                                        className="input input-bordered w-full mb-2"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Service Areas (comma-separated PIN codes)"
                                        className="input input-bordered w-full mb-2"
                                        value={serviceAreas}
                                        onChange={(e) => setServiceAreas(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="input input-bordered w-full mb-2"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="District"
                                        className="input input-bordered w-full mb-2"
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="input input-bordered w-full mb-2"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="modal-action">
                                    <button className="btn btn-primary" onClick={handleSubmit}>{currentPhysio ? 'Update' : 'Add'}</button>
                                    <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagePhysiotherapistsPage;
