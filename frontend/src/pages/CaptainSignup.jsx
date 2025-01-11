import React from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
    <div>
      <div>
        <img
          className="w-16 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />
      </div>
      <form >
        <h3 className="text-lg font-medium mb-2">What's your Name?</h3>
        <div className='flex gap-4 mb-5 font-base'>
        <input
          className="bg-[#eeeeee] mb-5 rounded px-4  w-full text-base placeholder:text-sm"
          type="firstname"
        
          placeholder=" Firstname"
        />
        <input
          className="bg-[#eeeeee] mb-5 rounded px-4  h-7 w-full text-base placeholder:text-sm"
          type="lastname"
          // value={lastname}
          // onChange={(e)=>{setlastname(e.target.value)}}
          placeholder="LastName"
        />
        </div>
        
        <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 text-base rounded px-4  w-full  placeholder:text-sm"
            type="email"
            // value={email}
            // onChange={
            //   (e)=>{
            //     setemail(e.target.value)
            //   }
            // }
            
            placeholder=" Enter your Email"
          />
          <h3 className="text-lg font-medium mb-2">Enter password?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 text-base w-full placeholder:text-sm"
            type="password"
            // value={password}
            // onChange={
            //   (e)=>{
            //     setpassword(e.target.value)
            //   }
            // }
            placeholder="Enter your Password"
          />
        <button
          className="bg-[#111]  text-white font-semibold mb-5 rounded px-4 border w-full text-lg placeholder:text-sm"
          type="submit"
        >
          Login
        </button>
        <p >Already have a account? <Link to='/login' className="text-blue-400">Login</Link></p>
      </form>
    </div>
    <div>
      <p className="text-[10px] leading-2  ">
This site is protected by reCAPTCHA and the <span className='underline'> Google Policy </span> and <span className='underline'> Terms of Service apply
Privacy</span> .</p>
    </div>
  </div>
  )
}

export default CaptainSignup