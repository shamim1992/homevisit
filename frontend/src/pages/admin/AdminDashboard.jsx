import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Admin Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <aside className="bg-gray-100 w-64 p-4">
          <nav>
            <ul>
              <li><a href="/admin" className="block py-2">Dashboard</a></li>
              <li><a href="/admin/users" className="block py-2">Manage Users</a></li>
              <li><a href="/admin/orders" className="block py-2">Manage Orders</a></li>
              <li><a href="/admin/services" className="block py-2">Manage Services</a></li>
              <li><a href="/admin/physiotherapists" className="block py-2">Manage Physiotherapists</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>
          {/* Add dashboard content here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
