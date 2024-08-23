import React from 'react'
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className='w-60 px-5'>
      <div className='py-4 '>
        <h1 className='text-lg font-bold'>ChanRe Physiotherapy</h1>
      </div>
      <div className="mx-auto py-5">
        <ul>
          <li className='py-2 font-lg hover:bg-slate-200 hover:text-black px-2 rounded'><Link to="/admin" >Dashboard</Link></li>
          <li className='py-2 font-lg hover:bg-slate-200 hover:text-black px-2 rounded'><Link to="/admin/users" >Manage Users</Link></li>
          <li className='py-2 font-lg hover:bg-slate-200 hover:text-black px-2 rounded'><Link to="/admin/orders" >Manage Orders</Link></li>
          <li className='py-2 font-lg hover:bg-slate-200 hover:text-black px-2 rounded'><Link to="/admin/physiotherapists" >Manage Physiotherapists</Link></li>
          <li className='py-2 font-lg hover:bg-slate-200 hover:text-black px-2 rounded'><Link to="/admin/services" >Manage Services</Link></li>
          <li className='py-2 font-lg hover:bg-slate-200 hover:text-black px-2 rounded'><Link to="/admin/assign" >Assign Orders</Link></li>
        </ul>
      </div>


    </div>
  )
}

export default Sidebar