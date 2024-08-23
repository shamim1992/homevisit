import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [filterRole, setFilterRole] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/admin/users', {
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

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:5002/api/admin/users/${userId}/role`, { role: newRole }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
            alert('User role updated successfully.');
        } catch (error) {
            console.error('Error updating user role:', error);
            alert('Failed to update user role.');
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await axios.delete(`http://localhost:5002/api/admin/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setUsers(users.filter(user => user._id !== userId));
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user.');
            }
        }
    };
    

    const filteredUsers = users
        .filter(user => filterRole === 'all' || user.role === filterRole)
        .filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen flex">
            <div className='min-h-screen w-60 bg-black text-white hidden md:block'>
                <Sidebar />
            </div>
            <div className='flex-1'>
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center">Manage Users</h2>

                    <div className="mb-4 flex flex-col md:flex-row justify-between">
                        <div className="w-full md:w-1/3">
                            <label className="label">
                                <span className="label-text">Filter by Role</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="physiotherapist">Physiotherapist</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 mt-4 md:mt-0">
                            <label className="label">
                                <span className="label-text">Search Users</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Search by name or email"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select
                                                className="select select-bordered"
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                                <option value="physiotherapist">Physiotherapist</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm mx-1"
                                                onClick={() => console.log(`Edit user with ID: ${user._id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-error btn-sm mx-1"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </button>
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

export default ManageUsersPage;
