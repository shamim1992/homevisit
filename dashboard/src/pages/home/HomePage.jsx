import React from 'react'
import Navbar from '../../components/Home/Navbar'
import HeroSection from '../../components/Home/HeroSection'
import ServiceList from '../../components/Home/ServiceList'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <ServiceList/>
    </div>
  )
}

export default HomePage