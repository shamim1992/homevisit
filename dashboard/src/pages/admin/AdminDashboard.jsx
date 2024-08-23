import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  console.log(currentUser)
  return (
    <div className="min-h-screen flex ">
      <div className='min-h-screen w-60 bg-black text-white hidden md:block' >
        <Sidebar/>
      </div>
      <div className='flex-1'>
        <Navbar/>

        <div className='w-full'>
          <div className="card">
            <div className="card-header">
              {/* <h3 className="card-title">Admin Dashboard</h3> */}
            </div>
            <div className="card-body">
              <div className="text-center">
                <h2>Hi <strong>{currentUser.name}</strong> , Welcome to the ChanRe Physiotherapy</h2>
                <p>Here you can manage all the necessary information.</p>
                <div className='flex justify-center gap-2 mt-4'>
                <Link to="/admin/users" className="bg-blue-500 text-white px-4 py-2 rounded">Manage Users</Link>
                <Link to="/admin/orders" className="bg-blue-500 text-white px-4 py-2 rounded">Manage Orders</Link>
                <Link to="/admin/physiotherapists" className="bg-blue-500 text-white px-4 py-2 rounded">Manage Physiotherapists</Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

