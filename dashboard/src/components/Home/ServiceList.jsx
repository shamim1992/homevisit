import React from 'react';

const services = [
    { name: 'Interferential Therapy (IFT)', description: 'A therapy using low-frequency electrical currents to stimulate muscles and nerves.' },
    { name: 'Ultrasound Therapy (UST)', description: 'A treatment that uses sound waves to reduce pain and promote tissue healing.' },
    { name: 'Wax Therapy', description: 'A soothing treatment using heated wax to relieve pain and improve circulation.' },
    { name: 'Intermittent Cervical Traction (ICT)', description: 'A therapy that applies a gentle pulling force to the neck to relieve pain.' },
    { name: 'Intermittent Pelvic Traction (IPT)', description: 'A therapy that applies a pulling force to the pelvic area to alleviate discomfort.' },
    { name: 'TENS', description: 'Transcutaneous Electrical Nerve Stimulation to relieve pain through electrical pulses.' },
    { name: 'Electrical Stimulation', description: 'A therapy using electrical currents to stimulate muscle contractions.' },
    { name: 'Mobilisation', description: 'Manual therapy techniques to improve joint mobility and reduce pain.' },
  ];
  

const ServiceList = () => {
  return (
    <div className=" mx-auto px-10  py-16 bg-[#893170]">
      <h2 className="text-3xl font-extrabold text-center mb-12 text-white">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="relative group overflow-hidden rounded-lg shadow-md">
            <div className="absolute inset-0  opacity-75 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
            <div className="relative p-8 bg-white rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{service.name}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="text-right">
                <button className="px-5 py-2  outline outline-2 rounded-full hover:outline-[#893170] outline-blue-500">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
