import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="min-h-screen w-60 bg-gray-800 text-white">
            <div className="p-4">
                <h2 className="text-xl font-bold">Physio Dashboard</h2>
            </div>
            <ul className="mt-6">
                <li className="p-3">
                    <NavLink to="/physio"  className="block">
                        Dashboard
                    </NavLink>
                </li>
                <li className="p-3">
                    <NavLink to="/physio/appointments"  className="block">
                        Appointments
                    </NavLink>
                </li>
                <li className="p-3">
                    <NavLink to="/physio/sessions"  className="block">
                        Sessions
                    </NavLink>
                </li>
                {/* <li className="p-3">
                    <NavLink to="/physio/patients"  className="block">
                        Patients
                    </NavLink>
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
