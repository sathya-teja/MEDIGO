import React, { useContext } from 'react';
import Login from './pages/login';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './contexts/AdminContext';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointments from './pages/Admin/Appointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';


const App = () => {
  const { aToken } = useContext(AdminContext)
  return aToken ? (
    <div className='bg-[#F8F9FD]'>
   
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<Appointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>

        </Routes>
      </div>
    </div>
  ) : (
    <div >
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App;
