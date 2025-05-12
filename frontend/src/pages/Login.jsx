import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'

const Login = () => {

const [state, setState] = useState('Sign Up')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')

const onSubmitHandler = async (e) => {
  e.preventDefault()
  
}

  return (
    <form className="min-h-[80vh] flex items-center">
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w[340px] sm:min-w-96 border border-gray-100 rounded-xl text-zinc-600 text-sm shadow-lg'>
      <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
      <p >Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment</p>
      {
        state === "Sign Up" && <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.name)} value={name} required />
      </div>
      }
  
     
  
      <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.name)} value={email} required />
      </div>
  
      <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.name)} value={password} required />
      </div>
  
      <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
      {
        state === "Sign Up" ? (
          <p className='text-center'>Already have an account? <span onClick={() => setState("Login")} className='text-primary cursor-pointer'>Login</span></p>
        ) : (
          <p className='text-center'>Don't have an account? <span onClick={() => setState("Sign Up")} className='text-primary cursor-pointer'>Create Account</span></p>
        )
      }
    </div>
  </form>
  )
}

export default Login