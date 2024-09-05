import React from 'react';

const MissionAndVision = () => {
  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-3xl font-extrabold text-center mb-12 text-blue-500">
        Our Mission & Vision
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h3>
          <p className="text-gray-600 text-lg">
            ChanRe aims to provide compassionate, high-quality physiotherapy and rehabilitation in a more accessible, affordable, and patient-centric fashion.
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h3>
          <p className="text-gray-600 text-lg">
            With a comprehensive home-healthcare model enabled by technology and supported by a team of dependable and compassionate care providers, our vision is to provide for every family, in a holistic manner, preventive care, assistance during ailments, pre and post hospitalization care, disease management programs, and healthy aging for all age groups.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;
