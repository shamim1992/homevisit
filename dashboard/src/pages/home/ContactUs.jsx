import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';

const ContactUs = () => {
  return (
    <>
<Navbar/>
<div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-extrabold text-center mb-12 text-blue-500">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="input input-bordered w-full text-gray-900"
                id="name"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="input input-bordered w-full text-gray-900"
                id="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="textarea textarea-bordered w-full text-gray-900"
                id="message"
                placeholder="Your Message"
                rows="5"
              ></textarea>
            </div>
            <div className="text-center">
              <button className="btn btn-primary px-6 py-3 transition-transform transform hover:scale-105">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
          <p className="mb-4">We’d love to hear from you! Reach out to us through any of the methods below.</p>
          <div className="mb-4">
            <FaPhoneAlt className="inline-block text-2xl mr-3" />
            <span className="text-lg">+91 76187 75276</span>
          </div>
          <div className="mb-4">
            <FaEnvelope className="inline-block text-2xl mr-3" />
            <span className="text-lg">contact@chanre.com</span>
          </div>
          <div>
            <FaMapMarkerAlt className="inline-block text-2xl mr-3" />
            <span className="text-lg">Metro Station, No. 414/65, 20th Main, Chord Rd, near Rajajinagar, 1st Block, Rajajinagar, Bengaluru, Karnataka 560010</span>
          </div>
          <div className="mt-8">
            <iframe
              className="w-full h-64 rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15550.287401576948!2d77.5502906!3d12.9992138!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3dbc8be6ee1f%3A0x99d77f3579e9ed2e!2sChanRe%20Rheumatology%20And%20Immunology%20Center%20And%20Research!5e0!3m2!1sen!2sin!4v1725266088110!5m2!1sen!2sin"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
    
  );
};

export default ContactUs;
