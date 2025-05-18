import React from 'react'
import { assets } from '../assets/assets'
import { Navigate, useNavigate ,NavLink } from 'react-router-dom'

const Footer = () => {

    const navigate=useNavigate()
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* Left Section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>MEDIGO – Your trusted companion for hassle‑free healthcare. Search, compare, and book appointments with verified doctors and clinics in seconds, get instant confirmations, and manage all your visits from one secure dashboard. Better care starts here.</p>
            </div>
            {/* Center Section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                    <li onClick={() => navigate('/')} >Home</li>
                    <li onClick={() => navigate('/about')}>About Us</li>
                    <li onClick={() => navigate('/contact')}>Contact Us</li>
                    <li onClick={() => navigate('/')}>Privacy policy</li>
                </ul>
            </div>
            {/* Right Section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 1234567890</li>
                    <li>medigocare@gmail.com</li>
                </ul>
                
            </div>
        </div>
            {/* ------Copyright text------- */}
        <div>
            <hr className='text-gray-300' />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Medigo - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer