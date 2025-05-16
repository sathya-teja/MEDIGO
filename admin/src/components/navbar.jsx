import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../contexts/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../contexts/DoctorContext'

const Navbar = () => {

const {aToken,setAToken}=useContext(AdminContext)
const {dToken, setDToken} = useContext(DoctorContext)
const navigate=useNavigate()


const logout = () => {
  navigate('/')
  aToken && setAToken('')
  aToken && localStorage.removeItem('aToken')
  dToken && setDToken('')
  dToken && localStorage.removeItem('dToken')
}

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white border-white'>
        <div className='flex items-center gap-2 text-x5'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=" "/>
            <p className='border px-2.5 rounded-full text-sm border-gray-500 text-gray-600'>{aToken? 'Admin':'Doctor'}</p>
            
        </div>
        <button onClick={logout} className='bg-purple-800 text-white  rounded-full 
             md:text-sm md:px-10 md:py-2 
             text-xs px-5 py-1.5'>Logout</button>
    </div>
  )
}

export default Navbar;