import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';

import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import PhysioDashboard from './pages/physiotherapist/PhysioDashboard';

import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import ManagePhysiotherapistsPage from './pages/admin/ManagePhysiotherapistsPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import AssignOrderPage from './pages/admin/AssignOrderPage';
import HomePage from './pages/home/HomePage';

import 'react-toastify/dist/ReactToastify.css';
import Appointments from './pages/physiotherapist/Appointments';
import Sessions from './pages/physiotherapist/Sessions';
import AdminRoutes from './components/AdminRoutes';
import PatientDetails from './pages/physiotherapist/PatientDetails';
import UserDash from './pages/users/UserDash';
import Dashboard from './components/user/Dashboard';
import Orders from './components/user/Orders';
import Register from './pages/auth/Register';
import Profile from './components/user/Profile';
import AboutPage from './pages/home/AboutPage';
import ServicePage from './pages/home/ServicePage';
import ContactUs from './pages/home/ContactUs';
import Appointment from './pages/home/Appointment';


const App = () => {



  return (
    <><Router>
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/user/dashboard" element={<UserDash />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/user/orders" element={<Orders />} />
        <Route path="/user/profile" element={<Profile />} />
        

        {/* physio routes */}
        <Route path="/physio/appointments" element={<Appointments />} />
        <Route path='/physio/sessions' element={<Sessions />} />
        <Route path="/physio/patient/:patientId" element={<PatientDetails />} />


        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/physio" element={<PhysioDashboard />} />
          <Route path="/admin/users" element={<ManageUsersPage />} />
          <Route path="/admin/orders" element={<ManageOrdersPage />} />
          <Route path="/admin/physiotherapists" element={<ManagePhysiotherapistsPage />} />
          <Route path="/admin/services" element={<ManageServicesPage />} />
          <Route path="/admin/assign" element={<AssignOrderPage />} />
        </Route>

  




      </Routes>
    </Router>

    </>

  );
};

export default App;