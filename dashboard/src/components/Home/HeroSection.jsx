import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900 py-8">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">ChanRe Physiotherapy Services</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"> Now At Your Doorstep</p>
                <button  className="inline-flex items-center justify-center mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:outline-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 px-4 py-2">
                    <Link to={'/services'}>Book Now</Link>
                </button>
                <button  className="inline-flex items-center justify-center   text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 px-4 py-2">
                <Link to={'/about'}>Learn More</Link>
                </button> 
            </div>
            <div className="mt-5 lg:mt-0 lg:col-span-5 lg:flex">
                <img src="https://chanrephysio.com/assets/physiotherapy-B0bq5Adm.png" alt="mockup"/>
            </div>                
        </div>
    </section>
        </div>
        
    )
}

export default HeroSection