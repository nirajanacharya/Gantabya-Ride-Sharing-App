import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import {useNavigate} from 'react-router-dom'  
import axios from 'axios' 
import {CaptainDataContext} from '../context/CaptainContext'  
import { useContext } from 'react'

const Captainlogin = () => {
  const navigate = useNavigate(); 

  const {updateCaptain}= React.useContext(CaptainDataContext) 

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
  

  

    const submitHandler= async (e)=>{
      e.preventDefault();
  

  
     const captain = {
        email:email,
        password:password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
      if(response.status === 200){
        const data =response.data
        updateCaptain(data)
        localStorage.setItem('token', data.token) 

        navigate('/captain-home')
      }

      setemail("");
      setpassword("");
  
    }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
    <div>
      <div>
        <img
          className="w-16 mb-10 "
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber logo"
        />
      </div>
      <form onSubmit={submitHandler}>
        <h3 className="text-lg font-medium mb-2">What's your email?</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4  w-full text-lg placeholder:text-sm"
          type="email"
          value={email}
          onChange={
            (e)=>{
              setemail(e.target.value)

            }
          }
          placeholder=" Enter your Email"
        />
        <h3 className="text-lg font-medium mb-2">What's your password?</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4  w-full text-lg placeholder:text-sm"
          type="password"
          value={password}
          onChange={
            (e)=>{
              setpassword(e.target.value)
            }
          }
          placeholder="Enter your Password"
        />
        <button
          className="bg-[#111]  text-white font-semibold mb-7 rounded px-4 border w-full text-lg placeholder:text-sm"
          type="submit"
        >
          Login
        </button>
        <p >Join a fleet? <Link to='/captain-signup' className="text-blue-400">Register as Captain</Link></p>
      </form>
    </div>
    <div>
    <Link to='/login' className=" flex items-center justify-center bg-[#efac35]  text-black font-semibold mb-7 rounded px-4 border w-full text-lg placeholder:text-sm">
      Sign in as User
    </Link>
    </div>
  </div>
  )
}

export default Captainlogin