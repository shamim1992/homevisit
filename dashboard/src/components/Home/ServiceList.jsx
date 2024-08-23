import React from 'react'

const ServiceList = () => {
  return (
    <div className='flex'>
        <div className='flex-1'>
            <div className='py-4 px-6 bg-gray-100'>
                <h2>Service 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
        <div className='flex-1'>
            <div className='py-4 px-6 bg-gray-100'>
                <h2>Service 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
        <div className='flex-1'>
            <div className='py-4 px-6 bg-gray-100'>
                <h2>Service 3</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    </div>
  )
}

export default ServiceList