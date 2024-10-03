import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { apiUrl } from '../../AppUrl';
import { Link } from 'react-router-dom';

const ManageApplication = () => {
    const [users, setUsers] = useState([]);
  console.log(users)
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/apllications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [token]);



    return (
        <div className="min-h-screen flex">
            <div className='min-h-screen w-60 bg-black text-white hidden md:block'>
                <Sidebar />
            </div>
            <div className='flex-1'>
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center">Manage Application</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((items,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{items.username}</td>
                                                <td>{items.email}</td>
                                                <td>{items.contact}</td>
                                                <td>
                                                    <Link to={`/admin/applicant/${items._id}`} className="text-blue-500 font-bold">View</Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                                }
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default ManageApplication