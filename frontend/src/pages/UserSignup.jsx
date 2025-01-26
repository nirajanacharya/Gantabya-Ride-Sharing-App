import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios' 
import {UserDataContext} from '../context/UserContext'
import logo from '../assets/img/logo.png'
const UserSignup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  
  const navigate = useNavigate(); 

  const {user, setUser} = React.useContext(UserDataContext) 
      //usestate for login data 
      
    
    
      const submitHandler= async (e)=>{
        e.preventDefault();

        const newUser={
          fullname:
          {
            firstname:firstname,
            lastname:lastname
          },
          email:email,
          password:password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
        if(response.status === 201){
          const data = response.data
          setUser(data.user)
          localStorage.setItem('token',data.token)
          navigate('/home')
        }

        setemail("");
        setpassword("");
        setfirstname("");
        setlastname("");


    
      }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
    <div>
      <div>
        <img
          className="w-16 mb-10 "
          src={logo}
          alt="Gantabya logo"
        />
      </div>
      <form onSubmit={submitHandler}>
        <h3 className="text-lg font-medium mb-2">What's your Name?</h3>
        <div className='flex gap-4 mb-5 font-base'>
        <input
          className="bg-[#eeeeee] mb-5 rounded px-4  w-full text-base placeholder:text-sm"
          type="firstname"
          value={firstname}  
          onChange={(e)=>{setfirstname(e.target.value)}}
        
          placeholder=" Firstname"
        />
        <input
          className="bg-[#eeeeee] mb-5 rounded px-4  h-7 w-full text-base placeholder:text-sm"
          type="lastname"
          value={lastname}
          onChange={(e)=>{setlastname(e.target.value)}}
          placeholder="LastName"
        />
        </div>
        
        <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 text-base rounded px-4  w-full  placeholder:text-sm"
            type="email"
            value={email}
            onChange={
              (e)=>{
                setemail(e.target.value)
              }
            }
            
            placeholder=" Enter your Email"
          />
          <h3 className="text-lg font-medium mb-2">Enter password?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 text-base w-full placeholder:text-sm"
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
          className="bg-[#111]  text-white font-semibold mb-5 rounded px-4 border w-full text-lg placeholder:text-sm"
          type="submit"
        >
          Create Account
        </button>
        <p >Already have a account? <Link to='/login' className="text-blue-400">Login</Link></p>
      </form>
    </div>
    <div>
      <p className="text-[10px] leading-2  ">By continuing, you agree to Gantabya's Terms of Service and Privacy Policy.</p>
    </div>
  </div>
  )
}

export default UserSignup