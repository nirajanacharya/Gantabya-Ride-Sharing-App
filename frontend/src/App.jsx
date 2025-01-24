import React, { useContext } from "react";
import { Routes } from "react-router-dom";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserSignup from "./pages/UserSignup";
import Userlogin from "./pages/Userlogin";
import { Route } from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";  
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/captain-login" element={<Captainlogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path="/login" element={<Userlogin />} />
          <Route path='/riding' element={<Riding/>} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path='/captain-riding' element={<CaptainRiding/>} />
          <Route
            path="/home"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/users/logout"
            element={
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            }
          />
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>             
              <CaptainHome />
            </CaptainProtectWrapper>
             } />
            <Route path='/captain-logout' element={
              <CaptainProtectWrapper>
                <CaptainLogout />
              </CaptainProtectWrapper>
            } /> 
        </Routes>
      </div>
    </>
  );
};

export default App;
