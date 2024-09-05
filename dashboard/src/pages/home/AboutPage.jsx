import React from 'react'
import Navbar from '../../components/Home/Navbar'
import Footer from '../../components/Home/Footer'
import MissionAndVision from '../../components/Home/MissionAndVision'

const AboutPage = () => {
  return (
    <div>
        <Navbar/>
        <div className="container mx-auto px-6 py-16">
      {/* About Us Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-500">
          About Us
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md  transition-shadow duration-300 ease-in-out transform ">
          <p className="text-gray-600 text-lg leading-relaxed">
            ChanRe is a physiotherapy and rehabilitation facility with 20 years of experience in rheumatology and musculoskeletal rehabilitation, geriatric care, post-surgical recovery, and a variety of other conditions, including slipped disc, frozen shoulder, sports injuries, and back pain. Our top-notch physical therapy services, provided through state-of-the-art facilities and skilled physiotherapists, are now available from clinic to home. As part of our rehabilitation program, we offer physiotherapy services directly to patients at home.
          </p>
        </div>
      </section>

   

      {/* Vision Section */}
     <MissionAndVision/>
    </div>
        <Footer/>
    </div>
  )
}

export default AboutPage