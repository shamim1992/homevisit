import React from 'react'
import Navbar from '../../components/Home/Navbar'
import HeroSection from '../../components/Home/HeroSection'
import ServiceList from '../../components/Home/ServiceList'
import MissionAndVision from '../../components/Home/MissionAndVision'
import Footer from '../../components/Home/Footer'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <ServiceList/>
        <MissionAndVision/>
        <Footer/>
    </div>
  )
}

export default HomePage