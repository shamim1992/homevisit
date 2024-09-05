import React from 'react'
import Navbar from '../../components/Home/Navbar'
import ServiceList from '../../components/Home/ServiceList'
import Footer from '../../components/Home/Footer'

const ServicePage = () => {
  return (
    <div>
        <Navbar/>
        <ServiceList/>
        <Footer/>
    </div>
  )
}

export default ServicePage