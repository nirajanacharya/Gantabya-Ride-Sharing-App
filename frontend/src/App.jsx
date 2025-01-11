import React from 'react'
import { Routes } from 'react-router-dom'
import Home from './pages/Home'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
import Userlogin from './pages/Userlogin'
import { Route } from 'react-router-dom'


const App = () => {
  return (
    <>
    <div >
      <Routes>
        <Route path='/'element={<Home />} />
        <Route path='/captain-login'element={<Captainlogin />} />
        <Route path='/captain-signup'element={<CaptainSignup />} />
        <Route path='/login'element={<Userlogin />} />
        <Route path='/signup'element={<UserSignup />} />
      </Routes>
    </div>
    </>
  )
}

export default App