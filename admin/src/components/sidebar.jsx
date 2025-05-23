import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../contexts/AdminContext'
import { DoctorContext } from '../contexts/DoctorContext'

const Sidebar = () => {
   const {aToken}=useContext(AdminContext)
   const {dToken} = useContext(DoctorContext)
   return (
    <div className='min-h-screen bg-white border-white shadow-lg border-r '>
       {
        aToken && <ul className='text-[#515151] mt-5 '>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-purple-800':''}`}  to={'/admin-dashboard'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets.home_icon} alt=""/>
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-purple-800':''}`} to={'/all-appointments'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets.appointment_icon} alt=""/>
                <p className='hidden md:block'>All Appointments</p>
            </NavLink>
            <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-purple-800':''}`} to={'/add-doctor'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets.add_icon} alt=""/>
                <p className='hidden md:block'>Add Doctors</p>
            </NavLink>
            <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-purple-800':''}`} to={'/doctor-list'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets.people_icon} alt=""/>
                <p className='hidden md:block'>Doctors List</p>
            </NavLink>
        </ul>
       }

       {
        dToken && <ul className='text-[#515151] mt-5 '>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-purple-800':''}`}  to={'/doctor-dashboard'}>
                <img src={assets.home_icon} alt=""/>
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-purple-800':''}`} to={'/doctor-appointments'}>
                <img src={assets.appointment_icon} alt=""/>
                <p className='hidden md:block'>All Appointments</p>
            </NavLink>
            
            <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-purple-800':''}`} to={'/doctor-profile'}>
                <img src={assets.people_icon} alt=""/>
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
       }
    </div>
  )
}

export default Sidebar;