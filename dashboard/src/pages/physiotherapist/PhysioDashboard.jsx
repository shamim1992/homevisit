import React from 'react';
import Sidebar from '../../components/physio/Sidebar';
import Navbar from '../../components/physio/Navbar';
import { useSelector } from 'react-redux';

const PhysioDashboard = () => {
  const {currentUser} = useSelector(state => state.user)
  console.log(currentUser)
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold">Upcoming Appointments</h3>
                            <p>Details about upcoming appointments...</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold">Today's Sessions</h3>
                            <p>Details about today's sessions...</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold">Quick Actions</h3>
                            <p>Options for quick actions...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default PhysioDashboard